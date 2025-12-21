import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const jakartaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
  
  // Fungsi Helper untuk membuat range jam 00:00:00 s.d 23:59:59
  const getDayRange = (date: Date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    
    return { start, end };
  };

  const today = getDayRange(jakartaTime);

  try {
    const trialsEndingToday = await prisma.subscription.findMany({
      where: {
        status: "TRIAL",
        trialEndDate: {
          gte: today.start, // Lebih besar/sama dengan 00:00
          lte: today.end,   // Lebih kecil/sama dengan 23:59
        },
      },
      include: { user: true },
    });

    for (const sub of trialsEndingToday) {
      await sendEmail({
        to: sub.user.email,
        subject: `Trial Berakhir Hari Ini: ${sub.name}`,
        title: "Trial Segera Berakhir",
        message: `Trial untuk <strong>${sub.name}</strong> berakhir hari ini (${sub.trialEndDate?.toLocaleDateString("id-ID")}). Langganan akan diperbarui otomatis/berhenti sesuai kebijakan.`,
      });
    }

    const paymentsDueToday = await prisma.subscription.findMany({
      where: {
        status: { in: ["ACTIVE", "OVERDUE"] }, // Biasanya pending tidak dinotif "jatuh tempo", tapi terserah logic bisnis
        nextPaymentDate: {
          gte: today.start,
          lte: today.end,
        },
      },
      include: { user: true },
    });

    for (const sub of paymentsDueToday) {
      await sendEmail({
        to: sub.user.email,
        subject: `Tagihan Jatuh Tempo: ${sub.name}`,
        title: "Tagihan Jatuh Tempo",
        message: `Tagihan untuk <strong>${sub.name}</strong> jatuh tempo hari ini.`,
      });
    }

    return NextResponse.json({
      ok: true,
      dateCheck: today.start.toISOString(),
      trialsNotified: trialsEndingToday.length,
      paymentsNotified: paymentsDueToday.length,
    });

  } catch (error) {
    console.error("Error sending notifications:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send notifications" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs"; // penting: jangan gunakan edge!

export async function GET(request: Request) {
  // Authorization
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  // Date setup
  const now = new Date();
  const jakarta = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));

  const toDateOnly = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const H = toDateOnly(jakarta);
  const Hminus1 = new Date(H);
  Hminus1.setDate(Hminus1.getDate() - 1);

  const format = (d: Date) => d.toISOString().split("T")[0];

  const targetH = format(H);
  const targetHminus1 = format(Hminus1);

  try {
    // TRIAL END USERS
    const trials = await prisma.subscription.findMany({
      where: {
        status: "TRIAL",
        trialEndDate: {
          in: [targetH, targetHminus1],
        },
      },
      include: { user: true },
    });

    // Send emails for trial
    for (const sub of trials) {
      await sendEmail({
        to: sub.user.email,
        subject: `Trial segera berakhir: ${sub.name}`,
        title: "Trial Akan Berakhir",
        message: `Trial untuk <strong>${sub.name}</strong> akan berakhir pada 
          <strong>${new Date(sub.trialEndDate!).toLocaleDateString("id-ID")}</strong>.
          Jangan lupa cancel jika tidak ingin berlanjut.`,
      });
    }


    // NEXT PAYMENT USERS
    const payments = await prisma.subscription.findMany({
      where: {
        status: { in: ["ACTIVE", "OVERDUE", "PENDING"] },
        nextPaymentDate: {
          in: [targetH, targetHminus1],
        },
      },
      include: { user: true },
    });

    // Send emails for next payment
    for (const sub of payments) {
      await sendEmail({
        to: sub.user.email,
        subject: `Tagihan jatuh tempo: ${sub.name}`,
        title: "Tagihan Akan Jatuh Tempo",
        message: `Tagihan untuk <strong>${sub.name}</strong> jatuh tempo pada
          <strong>${new Date(sub.nextPaymentDate).toLocaleDateString("id-ID")}</strong>.`,
      });
    }

    return NextResponse.json({
      ok: true,
      trialsNotified: trials.length,
      paymentsNotified: payments.length,
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to send notifications",
      },
    );
  }
}

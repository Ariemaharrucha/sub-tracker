import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text }: { to: string, subject: string, text: string }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS, 
    },
  });

  try {
    await transporter.sendMail({
      from: `"tes better auth" <${process.env.GMAIL_USER}>`, 
      to: to, 
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Verifikasi Email</h2>
          <p>Kode verifikasi Anda adalah:</p>
          <h1 style="color: #333; letter-spacing: 5px;">${text.split(": ")[1] || text}</h1>
          <p>Kode ini berlaku selama 5 menit.</p>
        </div>
      `, 
    });
    console.log("Email berhasil dikirim ke:", to);
  } catch (error) {
    console.error("Gagal kirim email:", error);
  }
};
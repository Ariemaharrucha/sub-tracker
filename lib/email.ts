import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Template
function buildHtml({ title, message }: { title: string; message: string }) {
  return `
    <div style="font-family: Arial, sans-serif; padding:20px;">
      <h2 style="margin-bottom:10px;">${title}</h2>
      <p style="font-size:14px; color:#444;">${message}</p>
      <p style="margin-top:30px; font-size:12px; color:#777;">
        Notifikasi otomatis dari Subscription Tracker
      </p>
    </div>
  `;
}

export async function sendEmail({ to, subject, title, message }: { to: string; subject: string; title: string; message: string; }) {
  try {
    await transporter.sendMail({
      from: `"Subscription Tracker" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html: buildHtml({ title, message }),
    });

    console.log("Email sent:", to);
  } catch (err) {
    console.error("Send email failed:", err);
  }
}

import nodemailer from "nodemailer";

export const sendAuditEmail = async (recipientEmail, shareUrl) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: "Your AI Spend Audit Report",
        text: `Open your report: ${shareUrl}`
    });
};
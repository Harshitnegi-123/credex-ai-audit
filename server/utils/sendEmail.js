import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendAuditEmail = async (recipientEmail, shareUrl) => {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: recipientEmail,
            subject: "Your AI Spend Audit Report",
            text: `Open your report: ${shareUrl}`
        });
        console.log("Email sent to:", recipientEmail);
    } catch (err) {
        console.error("Email error:", err.message);
    }
};
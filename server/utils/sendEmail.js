import { Resend } from "resend";


export const sendAuditEmail = async (recipientEmail, shareUrl) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        await resend.emails.send({
            from: "AI Spend Audit <onboarding@resend.dev>",
            to: "harshunegi14@gmail.com",
            subject: "Your AI Spend Audit Report",
            text: `Open your report: ${shareUrl}`
        });
        console.log("Email sent to:", recipientEmail);
    } catch (err) {
        console.error("Email error:", err.message);
    }
};
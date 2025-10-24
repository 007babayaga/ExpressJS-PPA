const nodemailer = require("nodemailer");

// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// check if Transporter is ready to Send the Email
(async () => {
    try {
        await transporter.verify();
        console.log("---------Email server for Password Reset is Ready✅---------")
    }
    catch (err) {
        console.log("----------Error in Email Server❌--------", err.message)
    }
})();

const sendEmail = async (toEmail, subject, htmlText) => {
    try {
        await transporter.sendMail({
            from: `"TrueBuy Verification Team" <${process.env.SMTP_USER}>`, // sender address
            to: toEmail, // list of receivers
            subject: subject, // Subject line
            html: htmlText, // html body
        });
        console.log("--------------Message sent✅----------");
    } catch (err) {
        console.log("--------------Error while sending mail❌", err.message);
        throw new Error("Email not Sent!!")
    }
};

const sendResetEmail = async (user, resetToken) => {
    console.log(" ...sending reset link to", user.email);
    
    const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
    
    await sendEmail(
        user.email,
        "Reset Your Password - TrueBuy",
        `
        <!doctype html>
        <html lang="en">
        <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Password Reset</title>
        </head>
        <body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial,Helvetica,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8; padding:20px;">
        <tr>
            <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#fff; border-radius:8px; padding:30px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
                <tr>
                <td align="center" style="font-size:20px; font-weight:bold; color:#333;">
                    TrueBuy Password Reset
                </td>
                </tr>
                <tr>
                <td style="padding:20px 0; font-size:16px; color:#444;">
                    Hello ${user.name},<br/><br/>
                    You requested to reset your password. Click the button below to create a new password. This link will expire in <b>10 min</b>.
                </td>
                </tr>
                <tr>
                <td align="center" style="padding:20px 0;">
                    <a href="${resetUrl}" 
                    style="display:inline-block; padding:12px 30px; background:#3f8efc; color:white; text-decoration:none; border-radius:6px; font-size:16px; font-weight:bold;">
                    Reset Password
                    </a>
                </td>
                </tr>
                <tr>
                <td style="padding:10px 0; font-size:14px; color:#666;" align="center">
                    Or copy and paste this link in your browser:<br/>
                    <span style="color:#3f8efc; word-break:break-all;">${resetUrl}</span>
                </td>
                </tr>
                <tr>
                <td style="padding-top:20px; font-size:14px; color:#666;">
                    If you didn't request this password reset, please ignore this email. Your account will remain secure.
                </td>
                </tr>
                <tr>
                <td style="padding-top:30px; font-size:12px; color:#999;" align="center">
                    © ${new Date().getFullYear()} TrueBuy. All rights reserved.
                </td>
                </tr>
            </table>
            </td>
        </tr>
        </table>
        </body>
        </html>
        `
    );
};

module.exports = {sendResetEmail,sendEmail};
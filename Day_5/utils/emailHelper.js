const nodemailer = require("nodemailer");

// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

(async () => {
    try {
        await transporter.verify();
        console.log("-----------Email server is Started✅-----------");
    } catch (err) {
        console.log("-----------------Eror in Email server❌", err.message);
    }
})();

const sendemail = async (toEmail, subject, htmlText) => {
    try {
        await transporter.sendMail({
            from: `"TrueBuy verification Team" <${process.env.SMTP_USER}>`, // sender address
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

const sendOtp = async (toEmail, otp) => {
    console.log(" ...sending otp to",toEmail);
    await sendemail(
        toEmail,
        "Otp verification for TrueBuy",
        `
        <!doctype html>
        <html lang="en">
        <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>OTP Verification</title>
        </head>
        <body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial,Helvetica,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8; padding:20px;">
        <tr>
            <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#fff; border-radius:8px; padding:30px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
                <tr>
                <td align="center" style="font-size:20px; font-weight:bold; color:#333;">
                    Shopping App Verification
                </td>
                </tr>
                <tr>
                <td style="padding:20px 0; font-size:16px; color:#444;">
                    Hello,<br/><br/>
                    Use the OTP below to complete your verification. The code is valid for <b>5 minutes</b>.
                </td>
                </tr>
                <tr>
                <td align="center" style="padding:20px 0;">
                    <div style="font-size:28px; font-weight:bold; letter-spacing:6px; color:#3f8efc; background:#f1f5f9; padding:12px 20px; border-radius:6px; display:inline-block;">
                    ${otp}
                    </div>
                </td>
                </tr>
                <tr>
                <td style="padding-top:20px; font-size:14px; color:#666;">
                If you didn’t request this, you can ignore this email.
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

module.exports={sendOtp}

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
    await transporter.verify();
    console.log("----------✅Email server is Ready---------");
})();


const sendEmail = async (toEmail,subject,text,Html) => {
    try {
        await transporter.sendMail({
            from: '"Dummy team" <kschauhan054@gmail.com>', // sender address
            to: toEmail, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html:Html , // html body
        });
        console.log("----------✅message Sent-------");
    } catch (err) {
        console.error("------❌Error while sending Message", err.message);
    }
}

const sendOtp = async(email,otp)=>{
    console.log("---sending message to",email);
    await sendEmail(
        email,
        "From Dummy Team",
        "This could be a dummy Email",
        `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 6px 18px rgba(0,0,0,0.1);
            }
            h2 {
                color: #3f8efc;
                margin-bottom: 20px;
            }
            .otp {
                font-size: 28px;
                letter-spacing: 6px;
                font-weight: bold;
                color: #333;
                margin: 20px 0;
            }
            p {
                color: #555;
                line-height: 1.6;
            }
            .footer {
                margin-top: 30px;
                font-size: 12px;
                color: #999;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Dummy Team</h2>
            <p>Hi,</p>
            <p>Here is your One-Time Password (OTP):</p>
            <div class="otp">${otp}</div>
            <p>This OTP is valid for <b>5 minutes</b>. If you didn’t request this, please ignore this email.</p>
            <div class="footer">
                &copy; ${new Date().getFullYear()} Dummy Team. All rights reserved.
            </div>
        </div>
    </body>
    </html>`
    )
}

module.exports={sendOtp}
import "dotenv/config"
import nodemailer from "nodemailer"
export const verifyEmail = (token, email) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailConfiguration = ({
        from: `"DP App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Email Verification",
        text: `Hi there you have recently visited our website
        and entered your email.
        please follow the given link to verify your email
        http://localhost:5173/verify/${token}
        thanks
        `,
    });

transporter.sendMail(mailConfiguration, (error, info) => {
    if (error) throw Error(error);
    console.log("Email sent Succefully!");
    console.log(info);
});

}


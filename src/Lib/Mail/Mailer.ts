import nodemailer from "nodemailer";

class Mailer {

    private transporter;

    public constructor() {
        this.transporter = nodemailer.createTransport<any>({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },  
        });
    }


    public send = async(to: string, subject: string, body: string) => {
        this.transporter.sendMail({
            from: `PlanoMix <noreply@brevo.com>`,
            to,
            subject,
            html: body,
        });
    }
}

export default Mailer;
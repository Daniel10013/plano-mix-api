import { createTransport } from "nodemailer";

class Mailer {

    private transporter;

    public constructor() {
        this.transporter = createTransport({
            service: process.env.MAIL_SERVER,
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
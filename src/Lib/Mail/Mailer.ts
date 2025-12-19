import nodemailer from "nodemailer";

class Mailer {

    private transporter;

    public constructor() {
        const poolConfig = `smtp://${process.env.EMAIL_USER}:${process.env.EMAIL_PASS}@${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}/?pool=true`;
        this.transporter = nodemailer.createTransport(poolConfig);
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
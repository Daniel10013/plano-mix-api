import { Resend } from "resend";

class Mailer {

    private resendMailer: Resend;

    public constructor() {
        if (!process.env.RESEND_API_KEY) {
            throw new Error('API key do mailer faltando');
        }
        this.resendMailer = new Resend(process.env.RESEND_API_KEY);
    }


    public send = async (to: string, subject: string, body: string) => {
        return await this.resendMailer.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: to,
            subject: subject,
            html: body
        });
    }
}

export default Mailer;
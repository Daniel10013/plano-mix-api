import sgMail from '@sendgrid/mail';

class Mailer {

    async send(to: string, subject: string, body: string) {   
        if(!process.env.MAIL_SENDER){
            throw new Error('Erro ao enviar e-mail!');
        }     

        if(!process.env.MAIL_API_KEY){
            throw new Error('Sender de e-mail vazio!');
        }  

        sgMail.setApiKey(process.env.MAIL_API_KEY)
        const msg = {
            to: to,
            from: process.env.MAIL_SENDER,
            subject: subject,
            html: body,
        };

        sgMail.send(msg).then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            throw new Error(`Erro ao enviar email: ${error}`);
        })
    }
}

export default Mailer;

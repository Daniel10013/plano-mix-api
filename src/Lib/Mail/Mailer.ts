class Mailer {
    private apiKey: string;

    constructor() {
        if (!process.env.EMAIL_PASS) {
            throw new Error("BREVO_API_KEY não definida");
        }
        this.apiKey = process.env.EMAIL_PASS;
    }

    async send(to: string, subject: string, body: string) {
        console.log(this.apiKey);
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": this.apiKey,
            },
            body: JSON.stringify({
                sender: {
                    name: "PlanoMix",
                    email: "noreply@brevo.com",
                },
                to: [
                    {
                        email: to,
                    },
                ],
                subject,
                htmlContent: body,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Erro ao enviar email: ${error}`);
        }

        return await response.json();
    }
}

export default Mailer;

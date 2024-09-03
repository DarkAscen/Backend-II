import nodemailer from "nodemailer";
import { config } from "dotenv";

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.mailer.host,
            port: config.mailer.port,
            auth: config.mailer.auth,
        });
        this.from = "coderhouse@gmail.com";
    };

    async sendMail({to, subject, html}) {
        try {
            const info = await this.transporter.sendMail({
                from: this.from,
                to,
                subject,
                html,
            });
            return info;
        } catch (error) {
            throw new Error(error);
        }
    };
};

export const mailService = new MailService();
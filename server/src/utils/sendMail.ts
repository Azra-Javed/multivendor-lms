import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface IEmail {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

const sendMail = async (options: IEmail): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const templatePath = path.join(
    __dirname,
    "../mails",
    `${options.template}.ejs`
  );
  const html: string = await ejs.renderFile(templatePath, options.data);

  await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    html,
  });
};

export default sendMail;

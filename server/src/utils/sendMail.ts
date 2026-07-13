import { Resend } from "resend";
import ejs from "ejs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

interface IEmail {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (options: IEmail): Promise<void> => {
  try {
    const templatePath = path.join(
      process.cwd(),
      "mails",
      `${options.template}.ejs`,
    );

    // Render EJS template → HTML
    const html: string = await ejs.renderFile(templatePath, options.data);

    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM as string,
      to: options.email,
      subject: options.subject,
      html,
    });
  } catch (error: any) {
    console.error("Message:", error?.message);
    console.error(error);

    throw error;
  }
};

export default sendMail;

// import nodemailer, { Transporter } from "nodemailer";
// import ejs from "ejs";
// import path from "path";
// import { fileURLToPath } from "url";
// import dotenv from "dotenv";
// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// interface IEmail {
//   email: string;
//   subject: string;
//   template: string;
//   data: { [key: string]: any };
// }

// const sendMail = async (options: IEmail): Promise<void> => {
//   const transporter: Transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST, //mail server address
//     port: Number(process.env.SMTP_PORT),
//     service: process.env.SMTP_SERVICE,
//     auth: {
//       user: process.env.SMTP_MAIL,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   const templatePath = path.join(
//     process.cwd(),
//     "mails",
//     `${options.template}.ejs`,
//   );
//   const html: string = await ejs.renderFile(templatePath, options.data);

//   await transporter.sendMail({
//     from: process.env.SMTP_MAIL,
//     to: options.email,
//     subject: options.subject,
//     html,
//   });
// };

// export default sendMail;

import { Resend } from "resend";
import ejs from "ejs";
import path from "path";
import fs from "fs";
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
    console.log("========== RESEND EMAIL START ==========");
    console.log("Recipient:", options.email);
    console.log("Subject:", options.subject);
    console.log("Template:", options.template);

    const templatePath = path.join(
      process.cwd(),
      "mails",
      `${options.template}.ejs`,
    );

    console.log("Template path:", templatePath);
    console.log("Template exists:", fs.existsSync(templatePath));

    // Render EJS template → HTML
    const html: string = await ejs.renderFile(templatePath, options.data);

    console.log("Template rendered successfully");

    console.log("Sending email via Resend...");

    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM as string,
      to: options.email,
      subject: options.subject,
      html,
    });

    console.log("Email sent successfully");
    console.log("Resend response:", result);

    console.log("========== RESEND EMAIL END ==========");
  } catch (error: any) {
    console.error("========== RESEND EMAIL ERROR ==========");
    console.error("Message:", error?.message);
    console.error(error);

    throw error;
  }
};

export default sendMail;

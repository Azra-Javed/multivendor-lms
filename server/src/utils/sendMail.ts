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

import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";
import fs from "fs";
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
  try {
    console.log("========== SEND MAIL START ==========");
    console.log("Recipient:", options.email);
    console.log("Subject:", options.subject);
    console.log("Template:", options.template);

    console.log("SMTP_SERVICE:", process.env.SMTP_SERVICE);
    console.log("SMTP_MAIL:", process.env.SMTP_MAIL);

    console.log("Creating transporter...");

    const transporter: Transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },

      // Debugging timeouts
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    console.log("Transporter created");

    console.log("Verifying SMTP connection...");
    await transporter.verify();
    console.log("SMTP verified successfully");

    const templatePath = path.join(
      process.cwd(),
      "mails",
      `${options.template}.ejs`,
    );

    console.log("Template path:", templatePath);
    console.log("Template exists:", fs.existsSync(templatePath));

    console.log("Rendering template...");

    const html: string = await ejs.renderFile(templatePath, options.data);

    console.log("Template rendered successfully");

    console.log("Sending email...");

    const info = await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: options.email,
      subject: options.subject,
      html,
    });

    console.log("Email sent successfully");
    console.log("Message ID:", info.messageId);

    console.log("========== SEND MAIL END ==========");
  } catch (error: any) {
    console.error("========== SEND MAIL ERROR ==========");
    console.error("Message:", error?.message);
    console.error("Code:", error?.code);
    console.error("Command:", error?.command);
    console.error(error);

    throw error;
  }
};

export default sendMail;

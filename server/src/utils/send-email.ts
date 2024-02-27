import nodemailer from "nodemailer";
import { config } from "dotenv";

//Configuring environment variables
config({
  path: "./.env",
});

// console.log(`in send email`);

// console.log(process.env.EMAIL_SERVICE);


const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL_SENDER_ADDRESS,
    pass: process.env.EMAIL_SERVICE_APP_PASSWORD,
  },
}); 

export const sendEmail = async (options: {
  email: string;
  subject: string;
  message: string;
}) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "noaman2266@gmail.com", // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};

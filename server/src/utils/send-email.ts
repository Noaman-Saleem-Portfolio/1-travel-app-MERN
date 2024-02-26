import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "noaman2266@gmail.com",
    pass: "uykq pfaf vdvf xiyb",
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

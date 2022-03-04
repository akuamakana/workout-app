import nodemailer from 'nodemailer';

const sendEmail = async (email: string, message: string, link: string) => {
  // const testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'w5echetzeolpknaf@ethereal.email', // generated ethereal user
      pass: 'uBtQBSh14TgnWGtevj', // generated ethereal password
    },
  });

  const results = await transporter.sendMail({
    to: email,
    html: `<a href="${link}">${message}</a>`,
    subject: message,
  });

  console.log('Preview URL: ' + nodemailer.getTestMessageUrl(results));
};

export default sendEmail;

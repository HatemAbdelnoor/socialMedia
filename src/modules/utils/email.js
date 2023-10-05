
import nodemailer from 'nodemailer';

  const  sendEmail=async ({to,cc,bcc,subject, text,html,attachments=[]}={})=>{ 
const transporter = nodemailer.createTransport({
  service :"gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  const info = await transporter.sendMail({
    from: `"Hatem Abdelnoor" <${process.env.EMAIL}>`, 
    to,
    cc,
    bcc, 
    subject, 
    text ,
    html ,
    attachments
  });
  console.log(info);
}
export default sendEmail
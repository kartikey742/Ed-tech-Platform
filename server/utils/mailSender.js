const nodemailer = require('nodemailer');
const mailSender=async(email,title,body)=>{
try{
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    let  info = await transporter.sendMail({//The info object returned by transporter.sendMail() in Nodemailer  
        from: 'StudyNotion',                 //contains detailed information about the sent email.
        to: email,
        subject: title,
        html: body
    });
    console.log(info);
    return info
}   catch (error) {
    console.error('Error sending email:', error);
    } 
    
}
module.exports = mailSender;
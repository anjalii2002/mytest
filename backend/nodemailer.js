//NODEMAILER SERVICE
const nodemailer = require('nodemailer');
const cron =require('node-cron')
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Set to true if using a secure connection (TLS/STARTTLS)
    auth: {
      user: 'anjalichaturvedi0002@gmail.com',
      pass: 'zzxoapjzciwndpoi'
    }
  });
  const mailOptions = {
    from: 'anjalichaturvedi0002@gmail.com',
    to: 'puja9392.jn@gmail.com',
    subject: 'Hello hello',
    text: 'hello hello.'
  };

  cron.schedule('*/10 * * * * *', () => {
   
  
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred while sending email:', error.message);
    } else {
      console.log('Email sent successfully!', info.response);
    };
  })});
    


const nodemailer = require('nodemailer');



class EmailService {
    constructor() {
      this.transporter = nodemailer.createTransport({
        service: 'gmail', // Puedes cambiar el servicio por otro como Outlook, Yahoo, etc.
        auth: {
          user: process.env.EMAIL_USER, // Tu email
          pass: process.env.EMAIL_PASS  // Tu contraseña
        }
      });
    }
  
    async sendMail(to, subject, text, html) {
      const mailOptions = {
        from: process.env.EMAIL_USER, // Remitente
        to: to,                        // Destinatario
        subject: subject,              // Asunto del correo
        text: text,                    // Cuerpo del correo en texto plano
        html: html                     // Cuerpo del correo en formato HTML
      };
  
      try {
        const info = await this.transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
      } catch (error) {
        console.error('Error sending email:', error);
        throw error;
      }
    }
  }
  
  module.exports = new EmailService();
  
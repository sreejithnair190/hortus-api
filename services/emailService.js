const nodemailer = require("nodemailer");
const pug = require("pug");

class Email {
  firstName;
  to;
  from;

  constructor(user) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.from = `Hortus <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_SMTP_KEY,
      },
      // tls: {
      //   rejectUnauthorized: false, // Accept self-signed certificates - Uncomment if error arises
      // },
    });
  }

  async sendMail(view, subject, data) {
    data.support_email = process.env.SUPPORT_EMAIL;

    const html = pug.renderFile(view, data);

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    await this.newTransport().sendMail(mailOptions);
  }
}

module.exports = Email;

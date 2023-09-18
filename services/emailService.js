const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Hortus <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
      return nodemailer.createTransport({
        host: process.env.BREVO_HOST,
        port: 587,
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.BREVO_SMTP_KEY,
        },
        // tls: {
        //   rejectUnauthorized: false, // Accept self-signed certificates - Uncomment if error arises
        // },
      });
  }

  async send(template, subject) {
    const html = pug.renderFile(
      `${__dirname}/../public/mail/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      //text: htmlToText.fromString(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to Hortus");
  }

  async sendPasswordReset() {
    await this.send("passwordReset", "Password Reset");
  }
}

module.exports = Email;
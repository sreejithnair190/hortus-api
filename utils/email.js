const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Hortus <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
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

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject, text) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    const welcomeText =
      "Welcome to Hortus! We're excited to have you as a member.";
    await this.send("Welcome to Hortus", welcomeText);
  }

  async sendPasswordReset(message) {
    await this.send("Password Reset", message);
  }
};

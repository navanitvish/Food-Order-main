const nodemailer = require("nodemailer");

const sendOtpMail = (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Account created successfully",
    text: `
                      Welcome to FoodApp.,
                      Thank you for choosing us!
                      Your OTP is ${otp}
                      `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return { error: error };
    } else {
      return resp.json({ success: true, message: info.response });
    }
  });
};

const sendResetPasswordEmail = (email, resetLink) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Reset Your Password",
    html: `
      <p>Hello,</p>
      <p>You have requested to reset your password. Click the link below to reset it:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>If you didn't request this, you can ignore this email.</p>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
const confirmationEmail = (status, email) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let subject = "";
  let message = "";

  if (status === "approved") {
    subject = "Restaurant Account Approved";
    message = `
      <p>Hello,</p>
      <p>We are pleased to inform you that your restaurant account has been <strong>approved</strong>.</p>
      <p>You can now access the admin panel and manage your restaurant's menu and orders.</p>
      <p>If you have any questions, feel free to contact our support team.</p>
      <p>Best regards,</p>
      <p>Your Food Ordering App Team</p>
    `;
  } else if (status === "rejected") {
    subject = "Restaurant Account Rejected";
    message = `
      <p>Hello,</p>
      <p>We regret to inform you that your restaurant account has been <strong>rejected</strong>.</p>
      <p>If you believe this is a mistake or would like more information, please contact our support team.</p>
      <p>Best regards,</p>
      <p>Your Food Ordering App Team</p>
    `;
  }

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
const confirmationEmailDriver = (status, email, rejectionMessage = "") => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let subject = "";
  let message = "";

  if (status === "approved") {
    subject = "Restaurant Account Approved";
    message = `
      <p>Hello,</p>
      <p>We are pleased to inform you that your Driver account has been <strong>approved</strong>.</p>
      <p>You can now access the Driver app and manage orders.</p>
      <p>If you have any questions, feel free to contact our support team.</p>
      <p>Best regards,</p>
      <p>Your Food Ordering App Team</p>
    `;
  } else if (status === "rejected") {
    subject = "Restaurant Account Rejected";
    const reVerificationLink = `yourapp://reverification?driverId=${driverId}`;
    message = `
      <p>Hello,</p>
      <p>We regret to inform you that your Driver account has been <strong>rejected</strong>.</p>
      <p>Reason: ${rejectionMessage}</p>
      <p>If you would like to correct the issues and re-submit your profile, please <a href="${reVerificationLink}">click here</a> to update your documents.</p>
      <p>If you believe this is a mistake or would like more information, please contact our support team.</p>
      <p>Best regards,</p>
      <p>Your Food Ordering App Team</p>
    `;
  } else if (status === "blocked") {
    subject = "Driver Account Blocked";
    message = `
      <p>Hello,</p>
      <p>We regret to inform you that your Driver account has been <strong>blocked</strong> due to violations of our policies.</p>
      <p>If you believe this was done in error or would like further details, please reach out to our support team.</p>
      <p>Best regards,</p>
      <p>Your Food Ordering App Team</p>
    `;
  }

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = {
  sendOtpMail,
  sendResetPasswordEmail,
  confirmationEmail,
  confirmationEmailDriver,
};

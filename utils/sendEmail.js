import nodemailer from "nodemailer";


const PORT = process.env.PORT || "localhost:5000";


const transporter = nodemailer.createTransport({
  service: "Gmail", // or "Outlook", "Yahoo" depending on your email
  auth: {
    user: 'vishalsahu1230@gmail.com',
    pass: 'edqcntvglvqosarj'
  }
});

 export  const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `http://${PORT}/api/user/verify?token=${token}`;

  await transporter.sendMail({
    from: 'vishalsahu1230@gmail.com',
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your account.</p>`,
  });
};



export const sendResetPasswordEmail = async (email, token) => {
  const resetUrl = `http://localhost:30001/user/reset-password?token=${token}`;

  await transporter.sendMail({
    from: 'vishalsahu1230@gmail.com',
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  });
};

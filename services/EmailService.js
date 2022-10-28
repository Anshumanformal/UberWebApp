const nodemailer = require("nodemailer");

module.exports.sendEmail = async (emailObj) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_NODEMAILER_PASSWORD
            }
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'anshumanformal@gmail.com',   // dummy
            to: 'anshumanformal@gmail.com',
            // to: [].concat(emailObj.to),
            subject: `${emailObj.title}`,
            html: `${emailObj.message}`,
        });

        console.log("EmailService", info);
    } catch (error) {
        console.error("EmailService", error);
    }
};

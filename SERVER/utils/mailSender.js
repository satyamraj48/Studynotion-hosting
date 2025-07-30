const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			// port: process.env.MAIL_PORT,
			// secure: false,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		});

		let info = transporter.sendMail({
			from: "Study Notion || Codehelp - by Love Babbar",
			to: email,
			subject: title,
			html: `<h2>${body}</h2>`,
		});

		// console.log("Mail Sender INFO -> ", info);

		return info;
	} catch (error) {
		console.log("Error in sending mail at mailSender --> ", error);
	}
};

module.exports = mailSender;

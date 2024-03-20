import nodemailer from "nodemailer"

export class MailFactory {

    constructor(otpFactory, sqlDriver) {

        this.otpFactory = otpFactory;
        this.sqlDriver = sqlDriver

        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT == 465,
            auth: {
              user: process.env.SMTP_EMAIL,
              pass: process.env.SMTP_PASSWORD,
            },
        })

    }

    validatedEmail(email) {
        if (email == null) return false
        if (email.length <= 0) return false
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,7}$/.test(email)
    }

    validatedOTP(otp) {
        if (otp == null) return false
        if (email.length <= 0) return false
        return /^\d{6}$/.test(otp)
    }

    async sendOTPMail(email) {
        await this.otpFactory.generateOTP().then(otp => {
            
            if (!this.validatedEmail(email)) return console.error("Blocked faulty email input.", email)
    
            this.sqlDriver.stampOTP(email, otp)
    
            this.transporter.sendMail({
                from: process.env.SMTP_EMAIL,
                to: email,
                subject: "Here is you one time password for OTP Exercise",
                text: "Please use the following one time password to login: " + otp,
                html: "<b>Please use the following code to login: " + otp + "</b>",
            })}

        )
    }

}
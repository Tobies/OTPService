import express from "express";
import cors from "cors"
import { OTPFactory } from "./OTPFactory.js"
import { MailFactory } from "./MailFactory.js"
import { SQLDriver } from "./SQLDriver.js";

export class OTPService {


    constructor() {

        this.otpFactory = new OTPFactory()
        this.sqlDriver = new SQLDriver()
        this.mailFactory = new MailFactory(this.otpFactory, this.sqlDriver)

        this.app = express()
        this.port = process.env.API_PORT

        this.app.use(cors())

        this.setupRequestOTPRoute()
        this.setupVerifyOTPRoute()
    

        this.app.listen(this.port, () => {
            console.log("Listening on", this.port)
        })


    }

    setupRequestOTPRoute() {

        var mailFactory = this.mailFactory

        this.app.get("/request-otp/:email", (req, res) => {
            if (!mailFactory.validatedEmail(req.params.email)) return res.send("Please provide a valid email.")

            mailFactory.sendOTPMail(req.params.email)

            res.send("A one time code was sent to your email.")
        })

    }

    setupVerifyOTPRoute() {

        var mailFactory = this.mailFactory
        var sqlDriver = this.sqlDriver

        this.app.get("/verify-otp/:email/:otp", (req, res) => {

            var email = req.params.email
            var otp = req.params.otp

            if (!mailFactory.validatedEmail(email)) return res.send("Please provide a valid email.")
            if (!mailFactory.validatedOTP(otp)) return res.send("The OTP provided is either invalid or expired.")

            sqlDriver.verifyOTP(email, otp).then(result => {

                console.log("Verification for", email, "returned",result)
                res.send(result)
            })
            
        })


    }

}
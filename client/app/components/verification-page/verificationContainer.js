import FlavorText from "../common/flavorText.js"
import Title from "../common/title.js"
import EmailDisplay from "./sub-components/emailDisplay.js"
import KeyPad from "./sub-components/keyPad.js"
import OTPInput from "./sub-components/otpInput.js"
import SendAgainButton from "./sub-components/sendAgainButton.js"




export default function VerificationContainer() {
    return <div id="verficationContainer" className="absolute hidden flex-col justify-center items-center w-screen h-screen">
        <div className="flex flex-col justify-center items-center w-full h-full">
            <Title text={"Check your inbox"}/>
            <FlavorText id="verificationFlavorText" text={"We have sent you a one time password by email."}/>
            <EmailDisplay email="example@gmail.com"/>
            <OTPInput/>
            <SendAgainButton/>
            <KeyPad/>
        </div>
    </div>
}
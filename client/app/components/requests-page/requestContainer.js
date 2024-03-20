import FlavorText from "../common/flavorText.js"
import Title from "../common/title.js"
import EmailInputField from "./sub-components/emailInputField.js"
import RequestOTPButton from "./sub-components/OTPButton.js"



export default function RequestContainer() {
    return <div id="requestContainer" className="absolute flex flex-col justify-center items-center w-screen h-screen left-0 bottom-14 ">
        <div className="max-w-[53rem] max-h-[29rem] flex flex-col justify-center items-center w-full h-full">
            <Title text={"Welcome"}/>
            <FlavorText id="requestFlavorText" text={"Login to our site with a one time password!"}/>
            <EmailInputField/>
            <RequestOTPButton/>
        </div>
    </div>
}
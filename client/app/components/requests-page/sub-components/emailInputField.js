import { requestOTP } from "./OTPButton"

function handleKeyDown(e) {
    if (e.key == "Enter") requestOTP()
}

export default function EmailInputField() {
    return <div className="flex flex-col mt-10 w-10/12">
        <label className="text-placeholder font-normal text-base">Email</label>
        <input id="emailInput" inputMode="text" onKeyDown={handleKeyDown} placeholder="example@gmail.com" className="bg-input border-2 rounded-xl p-4 transition duration-50 ease-out focus:ease-in active:scale-[102.5%] focus:outline-none focus:border-button border-solid border-input text-base font-normal"/>
    </div>
}
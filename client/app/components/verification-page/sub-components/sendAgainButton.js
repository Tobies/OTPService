function requestOTP() {

    var email = document.getElementById("emailDisplay").getAttribute("email")
    fetch(process.env.NEXT_PUBLIC_OTP_SERVICE_URL + "/request-otp/" + email)
}
  

export default function SendAgainButton() {
    return <div className=" items-center justify-center flex">
            <button id="sendAgainButton" onClick={requestOTP} className="m-1 disabled:h-0 disabled:text-[0px] disabled:p-0 w-full bg-white border-0 rounded-xl p-4 text-base font-normal text-button transition duration-50 ease-out hover:ease-in hover:scale-105 active:scale-95"> Send again </button>
    </div>
}
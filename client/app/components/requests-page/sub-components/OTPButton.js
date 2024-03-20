export function requestOTP() {

    var email = document.getElementById("emailInput").value
    var flavorText = document.getElementById("requestFlavorText")
    
    flavorText.innerHTML = "Sending mail..."
  
    fetch(process.env.NEXT_PUBLIC_OTP_SERVICE_URL + "/request-otp/" + email).then(resp => {
        resp.text().then(resp => {
            
            
            var flavorText = document.getElementById("requestFlavorText")
            flavorText.innerHTML = resp

            if (resp.includes("\n")) return flavorText.innerHTML = "Please provide a valid email."
            
            if (resp === "Please provide a valid email.") return;

            var requestContainer = document.getElementById("requestContainer")
            requestContainer.classList.remove("flex")
            requestContainer.classList.add("hidden")

            var verificationContainer = document.getElementById("verficationContainer")
            verificationContainer.classList.remove("hidden")
            verificationContainer.classList.add("flex")

            var emailDisplay = document.getElementById("emailDisplay")
            emailDisplay.innerHTML = email
            emailDisplay.setAttribute("email", email)

            for (var i = 1; i <= 6; i++) document.getElementById("otpInput-" + i).value = ""

        })
    })
    
    
}
  


export default function RequestOTPButton() {
    return <div className="flex items-center justify-center mt-7 w-10/12">
            <button onClick={requestOTP} className="w-full bg-button border-0 rounded-xl p-4 text-base font-normal text-input transition duration-50 ease-out hover:ease-in hover:scale-105 active:scale-95"> Get your OTP </button>
    </div>
}
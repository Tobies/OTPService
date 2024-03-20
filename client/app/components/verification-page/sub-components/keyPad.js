import KeyPadButton from "./keyPadButton";

let selectedDigit = 1

function click(e) {
    

    var elements = []
    for (var i = 1; i <= 6; i++) elements.push(document.getElementById("otpInput-" + i))

    var element = elements[selectedDigit-1]
    
    if (!element) {
        selectedDigit = 1
        return
    }
    
    element.focus()

    var actionid = e.target.getAttribute("actionid")

    if (!actionid) return

    for (var i = selectedDigit-1; i < elements.length; i++) elements[i].value = ""

    switch(actionid) {

        case "delete":
            element.value = ""
            if (selectedDigit > 1) selectedDigit--
            element = elements[selectedDigit-1]
            if (element) element.focus()
            break;
        default:
            element.value = actionid
            if (selectedDigit < 6) selectedDigit++
            break
        
    }


    for (var i = 0; i < elements.length; i++) if (elements[i].value.length == 0) return
    
    verifyOTP()

}

export function verifyOTP() {
  
    var email = document.getElementById("emailDisplay").getAttribute("email")
    var otp = ""
    for (var i = 1; i <= 6; i++) otp += document.getElementById("otpInput-" + i).value

    document.getElementById("verificationFlavorText").innerHTML = "Verifiying..."
  
    fetch(process.env.NEXT_PUBLIC_OTP_SERVICE_URL + "/verify-otp/" + email + "/" + otp).then(resp => {
        resp.text().then(resp => {
            console.log(resp)
            var element = document.getElementById("verificationFlavorText")
            if (resp == "true") {
                element.innerHTML = "Your OTP is correct!"
            } else if (resp == "false") {
                element.innerHTML = "Your OTP is either incorrect or expired."
            } else {
                element.innerHTML = resp
            }
        })
    })
    
}

export default function KeyPad() {
    return <div className="grid grid-rows4 grid-cols-3 border-2 border-input rounded-xl">
        <KeyPadButton click={click} actionid={1} icon={1}/>
        <KeyPadButton click={click} actionid={2} icon={2}/>
        <KeyPadButton click={click} actionid={3} icon={3}/>
        <KeyPadButton click={click} actionid={4} icon={4}/>
        <KeyPadButton click={click} actionid={5} icon={5}/>
        <KeyPadButton click={click} actionid={6} icon={6}/>
        <KeyPadButton click={click} actionid={7} icon={7}/>
        <KeyPadButton click={click} actionid={8} icon={8}/>
        <KeyPadButton click={click} actionid={9} icon={9}/>
        <KeyPadButton/>
        <KeyPadButton click={click} actionid={0} icon={0}/>
        <KeyPadButton click={click} actionid={"delete"} icon={
            <svg actionid={"delete"} width="32px" height="32px" viewBox="0 0 24 24" fill="none"><g actionid={"delete"} strokeWidth="0"></g><g actionid={"delete"} strokeLinecap="round" strokeLinejoin="round"></g><g actionid={"delete"}> <path actionid={"delete"} d="M11.142 20C8.91458 20 7.80085 20 6.87114 19.4986C5.94144 18.9971 5.35117 18.0781 4.17061 16.24L3.48981 15.18C2.4966 13.6336 2 12.8604 2 12C2 11.1396 2.4966 10.3664 3.48981 8.82001L4.17061 7.76001C5.35117 5.92191 5.94144 5.00286 6.87114 4.50143C7.80085 4 8.91458 4 11.142 4L13.779 4C17.6544 4 19.5921 4 20.7961 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.7961 18.8284C19.5921 20 17.6544 20 13.779 20H11.142Z" stroke="#0DAC81" strokeWidth="2"></path> <path actionid={"delete"} d="M15.5 9.50002L10.5 14.5M10.5 9.5L15.5 14.5" stroke="#0DAC81" strokeWidth="2" strokeLinecap="round"></path> </g></svg>
        }/>
    </div>
}


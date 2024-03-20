import { verifyOTP } from "./keyPad"

function handleFocus() {
    document.activeElement.value = ""
}

function handleKeyDown(e) {
    if (e.key != "Backspace") return
    

    var n = e.target.getAttribute("n") - 1

    if (n == 5 && e.target.value != "") return e.target.value = ""

    if (n <= 0) return 

    var element = document.getElementById("otpInput-" + n)
    element.value = ""
    element.focus()


}


function handleValueChange() {
    var focused = document.activeElement
    var n = focused.getAttribute("n")

    if (!n) return

    n++

    var next = document.getElementById("otpInput-" + n)
    if (next) next.focus()
    else verifyOTP()

}

export default function DigitInput(props) {
    return <input inputMode="text" maxLength="1" onKeyDown={handleKeyDown} onInput={handleValueChange} onFocus={handleFocus} id={props.id} n={props.n} className="caret-button w-14 h-14 bg-input rounded-xl focus:ring-button focus:ring-2 focus:outline-none active:scale-105 text-center font-2xl m-1 transition duration-50 ease-out hover:ease-in"></input>
}


import DigitInput from "./digitInput";



export default function OTPInput() {
    return <div>
        <DigitInput id={"otpInput-1"} n={1}/>
        <DigitInput id={"otpInput-2"} n={2}/>
        <DigitInput id={"otpInput-3"} n={3}/>
        <DigitInput id={"otpInput-4"} n={4}/>
        <DigitInput id={"otpInput-5"} n={5}/>
        <DigitInput id={"otpInput-6"} n={6}/>
    </div>
}


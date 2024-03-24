'use client'

import RequestContainer from "./components/requests-page/requestContainer.js";
import VerificationContainer from "./components/verification-page/verificationContainer.js";
import dotenv from "dotenv"

dotenv.config()


export default function Home() {

  return (
    <>
      <RequestContainer/>
      <VerificationContainer/>
    </>
  );
}

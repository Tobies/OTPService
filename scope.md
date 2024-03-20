Front: 
[+] Main page with an input for an email and a login button.
[+] After clicking the button the user will be prompted to supply a 6 letters code
[+] Make sure the inputs are valid
[+] Prompt the user if mail is invalid

Database:
[+] A simple table with an ID email and Temp-5-min varint(6) otp

Back:
[+] Generated OTP by querying a weather API for city temperatures
[+] Handles forwarding mail with otp to a requested endpoint
[+] Make sure supplied email and passwords are not SQL injections
[+] Check expiration on login
[+] Handles OTP verification 


Tests:
[-] A simple script that runs the backend and tries to authenticate using post requests
[-] MAKE SURE TO VERIFY ENV VARIABLES

Mail:
[-] Design

Cleanup:
[-] Comment on code base

commands:
 run client - npm run dev
 run server - npx nodemon index.js 
# OTP Service
## What is this?
OTPService is a simple project made by Roei Oanunu for a job interview.
It contains a full service for OTP verification featuring otp generation from a weather api, sending emails and database sql and prunning.

🔍 The project's scope can be found [here](/scope.md). <br>
📋 An image of the task can be found [here](/task.png). <br>
🌐 A live demo can be found [here](https://roei-otp.verart.org) hosted by verart. <br>


### How to use (Client)
To run this service, you'll need [npm](https://www.npmjs.com/) installed on your computer, then you can use your command line as follow:
```bash
# Clone this repository (or download it manually)
$ git clone https://github.com/Tobies/OTPService

# Go into the repository
$ cd otpservice

# Go into client repository
$ cd client

# Install dependancies
$ npm install

# Setup enviroment variables
$ cp .env.example .env
! Edit the .env file. The value you will write there will be used later by the server.

# Run client in dev mode (It's simply faster)
$ npm run dev

Now you should be able to vist the website at https://localhost:3000

```

### How to use (Server)
This section assumes you followed "How to use (Client)"
```bash
# Go navigate to server folder
$ cd ../server

# Install dependancies
$ npm install

# Setup enviroment variables
$ cp .env.example .env
! Edit the .env file. Make sure all the values are correct and that your weather api key is valid.

# Run the server
$ node index.js

```

 
  

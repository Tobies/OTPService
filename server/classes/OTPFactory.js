
import fs from "fs"

export class OTPFactory {

    constructor() {
        this.countries = this.loadCountries()

    }

    loadCountries() {
        var data = fs.readFileSync("./data/countries.json", 'utf8')
        var json = JSON.parse(data)
        return json.countries
    }

    formatOTP(data) {

        var num
        var otp = ""
    
        for (var i = 0; i < data.length; i++) {
            
            num = data[i].current.temp_c

            num = Math.round(num)
    
            if (num < 0) num *= -1
            if (num < 10) num = "0" + num 
            
            otp += num 
    
        }
        
        return otp
    
    }
    
    async generateOTP() {

        const key = process.env.WEATHER_API_KEY
    
        var countriesMap = []

        for (var i = 0; i < 3; i++) countriesMap.push(this.countries[Math.floor(Math.random() * this.countries.length)])


        return await Promise.all(countriesMap.map(country => 
            fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${country}&aqi=no`).then(resp => resp.json())
        )).then(data => {
            return this.formatOTP(data)
        })
    
        
    }

}


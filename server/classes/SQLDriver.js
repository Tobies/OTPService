import mysql from "mysql"

export class SQLDriver {

    

    constructor() {

        this.expiry_delta = 300_000

        this.connection = mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USERNAME,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATABASE,
            port: process.env.SQL_PORT
        })
        
        this.connection.connect(error => {
            if (error) this.handleError(error, "Database connection error: ")
        })

        this.initTable()

        this.purgeExpired()

    }

    handleError(error, message) {
        console.error(message, error)
        return process.exit()
    }

    initTable() {
        this.connection.query("CREATE TABLE IF NOT EXISTS one_time_passwords (email VARCHAR(255) NOT NULL, password VARCHAR(6), generated_at BIGINT, PRIMARY KEY(email));", (error, result) => {
            if (error) return this.handleError(error, "Database table initialization error: ")
        })
    }

    stampOTP(email, otp) {
        this.connection.query("REPLACE INTO one_time_passwords (email, password, generated_at) VALUES ('" + email + "', '" + otp + "', " + Date.now() + ");", (error, result) => {
            if (error) return this.handleError(error, "Database table initialization error: ")
            console.log("Stamped ", email, " and ", otp)
        })
    }

    dropOTP(email) {
        this.connection.query("DELETE FROM one_time_passwords WHERE email='" + email + "';", (error, rows) => {
            if (error) return this.handleError(error, "Database error in otp drop: ")
        })
        return false
    }

    purgeExpired() {

        var expiry_delta = this.expiry_delta
        var now = Date.now()
        var purgedOTPs = 0
        var rowData
        
        this.connection.query("SELECT email, generated_at FROM one_time_passwords;", (error, rows) => {
            
            if (error) return this.handleError(error, "Database error in purge: ")
            

            for (var row in rows) {
                
                rowData = rows[row]

                if (rowData.generated_at + expiry_delta >= now) continue

                this.dropOTP(rowData.email)
                purgedOTPs++

            }

            console.log("purged " + purgedOTPs + " OTPs")
        })

    }

    async verifyOTP(email, otp) {

        var now = Date.now()
        var expiry_delta = this.expiry_delta

        var promise = await new Promise((resolve) => {

                this.connection.query("SELECT * FROM one_time_passwords WHERE email='" + email + "';", (error, result) => {
        
                    if (error) return this.handleError(error, "Database OTP verification error: ")
                    
                    if (result.length == 0) return resolve(false)
        
                    var data = result[0]
        
                    if (data.generated_at + expiry_delta < now) return resolve(this.dropOTP(data.email))
        
                    var ret = data.password == otp
        
                    if (ret) this.dropOTP(data.email)

                    resolve(ret)
        
                    
                })
        })

        return promise

    }

    async getStoredData() {
        var promise = await new Promise((resolve) => {
            this.connection.query("SELECT email, generated_at FROM one_time_passwords ORDER BY generated_at;", (error, rows) => {
                
                if (error) return this.handleError(error, "Database error while getting stored data: ")
                
                var data = {}
                var rowData
                for (var row in rows) {
                    
                    rowData = rows[row]
                    data[rowData.email] = rowData.generated_at
    
                }
    
                resolve(data)
            })
        })

        return promise
    }



}
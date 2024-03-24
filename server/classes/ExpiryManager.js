export class ExpiryManager {

    constructor(sqlDriver) {

        this.expiryQueue = {}
        this.expiryTaskId = null

        this.sqlDriver = sqlDriver;


    }

    restoreQueue() {
        var expiryManager = this

        this.sqlDriver.getStoredData().then(storedData => {

            for (var key in storedData) this.expiryQueue[key] = storedData[key] + 300_001
            
            expiryManager.refreshExpiryTask()
        })

    }

    forceExpiry(email) {
        if (email in this.expiryQueue) {
            delete this.expiryQueue[email]
        }
    
        this.refreshExpiryTask()
    }

    setupExpiry(email) {

        if (email in this.expiryQueue) {
            delete this.expiryQueue[email]
        }
    
        var expiry = Date.now() + 300_001
        this.expiryQueue[email] = expiry
    
        this.refreshExpiryTask()
    
    }
    
    refreshExpiryTask() {
        if (this.expiryTaskId != null) {
            clearTimeout(this.expiryTaskId)
            this.expiryTaskId = null
        }
        if (Object.keys(this.expiryQueue).length == 0) return this.expiryTaskId = null 
        
        
        var delay = Object.values(this.expiryQueue)[0] - Date.now()
        if (delay < 0) delay = 0 

        var expiryManager = this
        this.expiryTaskId = setTimeout(()=>{expiryManager.expiryTask()}, delay)
    
    }

    expiryTask() {
        var [email, expiry] = Object.entries(this.expiryQueue)[0]
    
        if (Date.now() > expiry) {
    
            delete this.expiryQueue[email]
            this.sqlDriver.dropOTP(email)
            console.log("OTP for " + email + " has expired.")
    
        }
    
        this.refreshExpiryTask()
    }



}
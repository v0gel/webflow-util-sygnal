
/*
 * webflow-track
 * 
 * Sygnal Technology Group
 * http://sygnal.com
 * 
 * Tracking Utilities
 */


/*
 * Tracker class.
 */

var defaultConfig = {

    // sessionStorage | localStorage | cookies
    method: 'sessionStorage',
    
    prefix: 'track' 

}

export class WfuTracker {

    config; // Optional config

    constructor(config = {}) {

        this.config = $.extend({}, defaultConfig, config);

    }

    trackKey = function(key) {
        return `${this.config.prefix}_${key}`;
    }

    track = function(key, val) {
        switch (this.config.method) {
            case "sessionStorage":
                sessionStorage.setItem(`${this.trackKey(key)}`, 
                    val || "true");
                break;
            case "localStorage":
                localStorage.setItem(`${this.trackKey(key)}`, 
                    val || "true");
                break;
            case "cookies":
                document.cookie = `${this.config.prefix}_${key}=${val || "true"}`; 
                break;
        }        

    }

    untrack = function(key) {
        switch (this.config.method) {
            case "sessionStorage":
                sessionStorage.removeItem(`${this.trackKey(key)}`); 
                break;
            case "localStorage":
                localStorage.removeItem(`${this.trackKey(key)}`); 
                break;
            case "cookies":
                document.cookie =  
                    `${this.trackKey(key)}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
                break;
        }        
    } 

    isTracked = function(key) {
        switch (this.config.method) {
            case "sessionStorage":
                return sessionStorage.getItem(`${this.trackKey(key)}`); 
                break;
            case "localStorage":
                return localStorage.getItem(`${this.trackKey(key)}`); 
                break;
            case "cookies":
                return document.cookie
                    .split('; ')
                    .find((row) => row.startsWith(`${this.trackKey(key)}`))
                    ?.split('=')[1];
                break;
        }
    }

    getItem = function(key) {
        switch (this.config.method) {
            case "sessionStorage":
                return sessionStorage.getItem(`${this.trackKey(key)}`); 
                break;
            case "localStorage":
                return localStorage.getItem(`${this.trackKey(key)}`); 
                break;
            case "cookies":
                return document.cookie
                    .split('; ')
                    .find((row) => row.startsWith(`${this.trackKey(key)}`))
                    ?.split('=')[1];
                break;
        }
    }

    reset = function() {
        switch (this.config.method) {
            case "sessionStorage":
                sessionStorage.clear();  
                break;
            case "localStorage":
                localStorage.clear();  
                break;
            case "cookies":

                var arrSplit = document.cookie.split(";");

                for(var i = 0; i < arrSplit.length; i++)
                {
                    var cookie = arrSplit[i].trim();
                    var cookieName = cookie.split("=")[0];
                
                    // If the prefix of the cookie's name matches the one specified, remove it
                    if(cookieName.indexOf(`${this.config.prefix}_`) === 0) {
                
                        // Remove the cookie
                        document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                    }
                }

                break;
        }
    }

}



var API = {
    getResource: function(url) {
        return new Promise(function(resolve, reject) {
            let xhttp = new XMLHttpRequest()
            xhttp.open('GET', url);
            xhttp.onload = function() {
                if (this.status == 200) {
                    resolve(JSON.parse(xhttp.response))
                } else {
                    reject({
                        status: this.status,
                        statusText: this.statusText
                    })
                }
            };
            xhttp.onerror = function() {
                reject({
                    status: this.status,
                    statusText: xhttp.statusText
                });
            };
            xhttp.send()
        })
    }
}
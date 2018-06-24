 var planetList = []

 function logMeIn() {
     let usr = document.getElementById('usrName').value
     let pwd = document.getElementById('usrPwd').value
     let hasAccess = false
     document.getElementById('login-form').style.display = 'none'
     document.getElementById('loginLoader').style.display = 'block'
     API.getResource(loginUrl)
         .then(function(res) {
             console.log(res)
             hasAccess = res.results.some(function(el) {
                 return el.name == usr && el.birth_year == pwd
             });

             if (hasAccess) {
                 //fetch all planet list for better search experience
                 API.getResource(planetListUrl)
                     .then(function(res) {
                         planetList = res.results
                         document.getElementById('login-form').style.display = 'block'

                         document.getElementById('loginLoader').style.display = 'none'
                         window.location.hash = '#home'
                     })
                     .catch(function(err) {
                         console.error('Augh, there was an error!', err);
                     });
                 // hide spinner and load second page
             } else {
                 console.log('login error')
             }
         })
         .catch(function(err) {
             console.error('Augh, there was an error!', err);
         });
 }
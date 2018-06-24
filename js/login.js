 var planetList = []

 function logMeIn() {
     let usr = document.getElementById('usrName').value
     let pwd = document.getElementById('usrPwd').value
     document.getElementById('login-form').style.display = 'none'
     document.getElementById('loginLoader').style.display = 'block'
     API.getResource(loginUrl)
         .then(function(res) {
             hasAccess = res.results.some(function(el) {
                 return el.name == usr && el.birth_year == pwd
             });
             if (hasAccess) {
                 document.getElementById('login-error').style.display = 'none'
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
             } else {
                 document.getElementById('login-error').style.display = 'block'
                 document.getElementById('login-form').style.display = 'block'
                 document.getElementById('loginLoader').style.display = 'none'
             }
         })
         .catch(function(err) {
             console.error('Augh, there was an error!', err);
         });
 }
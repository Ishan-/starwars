'use strict';
(function() {
    function init() {
        var router = new Router([
            new Route('login', 'login.html', true),
            new Route('home', 'home.html', false)
        ])
    }
    init()

})()

var baseUrl = 'https://swapi.co/api/',
    loginUrl = baseUrl + 'people/',
    planetListUrl = baseUrl + 'planets/',
    hasAccess = false;

if (!hasAccess) {
    //page loads set to login page
    window.location.hash = '#login'
}
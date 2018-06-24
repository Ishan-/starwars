'use strict';

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function(routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },
    init: function() {
        var r = this.routes;
        (function(scope, r) {
            window.addEventListener('hashchange', function(e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function(scope, r) {
        let hash = window.location.hash
        if (hash.length) {
            for (let i = 0; i < r.length; i++) {
                let route = r[i]
                if (route.isActiveRoute(hash.substr(1))) {
                    scope.goToRoute(route.htmlName)
                }
            }
        } else {
            for (let i = 0; i < r.length; i++) {
                let route = r[i]
                if (route.default) {
                    scope.goToRoute(route.htmlName)
                }
            }
        }
    },
    goToRoute: function(htmlName) {
        (function(scope) {
            let url = 'views/' + htmlName
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.status == 200 && this.readyState == 4) {
                    scope.rootElem.innerHTML = this.responseText
                }
            };
            xhttp.open('GET', url, true)
            xhttp.send()
        })(this)
    }
}
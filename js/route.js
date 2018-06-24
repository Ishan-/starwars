'use strict';

function Route(name, htmlName, defaultRoute) {
    this.constructor(name, htmlName, defaultRoute);
}

Route.prototype = {
    name: undefined,
    htmlName: undefined,
    default: undefined,
    constructor: function(name, htmlName, defaultRoute) {
        this.name = name;
        this.htmlName = htmlName;
        this.default = defaultRoute;
    },
    isActiveRoute: function(hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    }
}
'use strict';
var webdriver = require('selenium-webdriver');
var SauceLabs = require("saucelabs");
var username = process.env.SAUCE_USERNAME;
var accessKey = process.env.SAUCE_ACCESS_KEY;
var saucelabs = new SauceLabs({
    username: username,
    password: accessKey
});


function DriverFactory() {
    this.build();
}

DriverFactory.prototype.build = function() {
    var browser = process.env.BROWSER,
        version = process.env.VERSION,
        platform = process.env.PLATFORM,
        server = "http://" + username + ":" + accessKey +
            "@ondemand.saucelabs.com:80/wd/hub";

    //Instantiating the driver
    console.log("In Driver Factory instantiation");
    this.driver = new webdriver.Builder().
    withCapabilities({
        'browserName': browser,
        'platform': platform,
        'version': version,
        'username': username,
        'accessKey': accessKey,
        'name': jasmine.getEnv().currentSpec.description
    }).
    usingServer(server).
    build();

};

DriverFactory.prototype.quit = function(done) {
    this.driver.quit();
    done();
};

module.exports = DriverFactory;


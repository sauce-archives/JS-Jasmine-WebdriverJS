'use strict';
// var test = require('selenium-webdriver/testing');
var SauceLabs = require("saucelabs");
var username = process.env.SAUCE_USERNAME;
var accessKey = process.env.SAUCE_ACCESS_KEY;
var   saucelabs = new SauceLabs({
    username: username,
    password: accessKey
});

var DriverFactory = require('../lib/DriverFactory'),
    driverFactory;
global.testTimeout = 30000;

beforeEach(function (done) {
    console.log("In BaseTest BeforeEach");
    driverFactory = new DriverFactory();
    global.driver = driverFactory.driver;

    driver.getSession().then(function(sessionid) {
        driver.sessionID = sessionid.id_;
    });
    done();
});

afterEach(function (done) {
    var results = jasmine.getEnv().currentSpec.results_.failedCount;
    saucelabs.updateJob(driver.sessionID, {
        passed: results === 0
    }, function () {});
    driverFactory.quit(done);

});

var webdriver = require('selenium-webdriver');
var config = require('config');
var SauceLabs = require("saucelabs");
var username = process.env.SAUCE_USERNAME;
var accessKey = process.env.SAUCE_ACCESS_KEY;
var   saucelabs = new SauceLabs({
      username: username,
      password: accessKey
    });

var DriverFactory = require('../lib/DriverFactory'),
	driverFactory;
global.test_timeout = 30000;

jasmine.getEnv().defaultTimeoutInterval = 100000;

describe('basic test', function () {

	beforeEach(function () {
		driverFactory = new DriverFactory();
		global.driver = driverFactory.driver;

	});

	function BasePage(driver) {
		this.driver = driver;
	}

	afterEach(function () {
		// var results = jasmine.getEnv().currentSpec.results_.failedCount;
		// console.log(driver.sessionID);
		// saucelabs.updateJob(driver.sessionID, {
		// 	passed: results === 0
		// }, function () {});
		driver.quit();
	});

	it('should be on correct page', function (done) {
		driver.get(config.get("url"));
		driver.getTitle().then(function(title) {
			expect(title).toBe("title");
			done();
		});
	});
	it('should be on correct page2', function (done) {
		driver.get(config.get("url"));
		driver.getTitle().then(function(title) {
			expect(title).toBe("I am a page title - Sauce Labs");
			done();
		});
	});
});


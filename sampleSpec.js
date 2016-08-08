var config = require('config');
var webdriver = require('selenium-webdriver'),
	By = webdriver.By,
	until = webdriver.until;
var SauceLabs = require("saucelabs");
var username = process.env.SAUCE_USERNAME;
var accessKey = process.env.SAUCE_ACCESS_KEY;
var   saucelabs = new SauceLabs({
      username: username,
      password: accessKey
    });

jasmine.getEnv().defaultTimeoutInterval = 100000;

describe('basic test', function () {

	beforeEach(function () {
		var browser = process.env.BROWSER,
        version = process.env.VERSION,
        platform = process.env.PLATFORM,
        server = "http://" + username + ":" + accessKey +
        "@ondemand.saucelabs.com:80/wd/hub";

		//Instantiating the driver
		driver = new webdriver.Builder().
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

		driver.getSession().then(function(sessionid) {
		    driver.sessionID = sessionid.id_;
		});

		driver.get(config.get("url"));

	});

	afterEach(function () {
		var results = jasmine.getEnv().currentSpec.results_.failedCount;
		saucelabs.updateJob(driver.sessionID, {
      		passed: results === 0
    	}, function () {});
		driver.quit();
	});

	it('should be on correct page', function (done) {
		driver.getTitle().then(function(title) {
			expect(title).toBe(config.get("page.title"));
			done();
		});
	});

	it('should have the correct default textbox value', function (done) {
		driver.findElement(By.css(config.get("locators.textbox.input"))).getAttribute(value).then(function(value) {
			expect(value).toBe(config.get("expected.page.inputFocusText"));
			done();
		});
	});


});


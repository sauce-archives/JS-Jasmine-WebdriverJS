var webdriver = require('selenium-webdriver');
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
        server = "https://" + username + ":" + accessKey +
        "@ondemand.saucelabs.com:443/wd/hub";

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
	});

	afterEach(function () {
		var results = jasmine.getEnv().currentSpec.results_.failedCount;
		saucelabs.updateJob(driver.sessionID, {
      		passed: results === 0
    	}, function () {});
		driver.quit();
	});

	it('should be on correct page', function (done) {
		driver.get('https://saucelabs.com/test/guinea-pig');
		driver.getTitle().then(function(title) {
			expect(title).toBe('I am a page title - Sauce Labs');
			done();
		});
	});
});


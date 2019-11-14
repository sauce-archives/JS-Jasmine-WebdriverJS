var webdriver = require('selenium-webdriver');
var SauceLabs = require("saucelabs").default;
var username = process.env.SAUCE_USERNAME;
var accessKey = process.env.SAUCE_ACCESS_KEY;
var   saucelabs = new SauceLabs({
      username: username,
      password: accessKey
	});
var customReporter = require("./helpers");

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

describe('basic test', function () {

	beforeAll(function () {
		jasmine.getEnv().addReporter(customReporter)
	})

	beforeEach(async function () {
		var browser = process.env.BROWSER,
        version = process.env.VERSION,
        platform = process.env.PLATFORM,
        server = "http://" + username + ":" + accessKey +
        "@ondemand.saucelabs.com:80/wd/hub";

		driver = await new webdriver.Builder().
		    withCapabilities({
		        'browserName': browser,
		        'platform': platform,
		        'version': version,
		        'username': username,
		        'accessKey': accessKey,
		        'name': jasmine.currentTest.title
		    }).
		    usingServer(server).
		    build();

		driver.sessionID = await driver.getSession();
	});

	afterEach(async function () {
		var results = jasmine.currentTest.failedExpectations;
		await saucelabs.updateJob(username, driver.sessionID.id_, {
      		passed: results.length === 0
    	});
		await driver.quit();
	});

	it('should be on correct page', async function (done) {
		await driver.get('https://saucelabs.com/test/guinea-pig');
		expect(await driver.getTitle()).toBe('I am a page title - Sauce Labs');
		done();
	});
});


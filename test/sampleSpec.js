var config = require('config');
'use strict';
var test = require('selenium-webdriver/testing');
var assert = require('assert');
var BaseTest = require('./BaseTest');
var sampleSpec = require('../PageObjects/sampleSpec')

// var webdriver = require('selenium-webdriver'),
// 	By = webdriver.By,
// 	until = webdriver.until;
// var test = require('selenium-webdriver/testing');
// var DriverFactory = require('../lib/DriverFactory'),
// 	driverFactory;
global.testTimeout = 30000;

jasmine.getEnv().defaultTimeoutInterval = 100000;

describe('basic test', function () {
	var sample;
	beforeEach(function() {
		sample = new sampleSpec(global.driver);
	});
// this.timeout(global.testTimeout);
	it('should be on correct page', function (done) {
		sample.driver.get(config.get("url"));

		sample.driver.getTitle().then(function(title) {
			expect(title).toBe(config.get("expected.title"));
//			done();
		});
	});

	it('should have the correct default textbox value', function (done) {
		sample.driver.get(config.get("url"));

		sample.driver.findElement(By.css(config.get("locators.textbox.input"))).getAttribute(value).then(function(value) {
			expect(value).toBe(config.get("expected.page.inputFocusText"));
//			done();
		});
	});


});


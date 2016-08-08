'use strict';
var BasePage = require('./BasePage');
var assert = require('assert');

var FOCUSABLE_TEXTBOX = {css: '#i_am_a_textbox'};
var testText = "now I can focus";

function sampleSpec(driver) {
    BasePage.call(this, driver);
}

sampleSpec.prototype.constructor = sampleSpec;

sampleSpec.prototype.with = function(testText) {
    this.clear(FOCUSABLE_TEXTBOX);
    this.type(FOCUSABLE_TEXTBOX, testText);
};


module.exports = sampleSpec;

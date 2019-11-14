'use strict';

module.exports = function (grunt) {
    // configure tasks
    grunt.initConfig({
      shell: {
        runTests: {
            command: function(platform, browser, version) {
              return 'PLATFORM='+platform+' BROWSER='+browser+' VERSION='+version+' ./node_modules/.bin/jasmine sampleSpec.js'
            }
        }
      },
      concurrent: {
        runtest: ['run_Windows7_firefox_latest', 'run_Windows10_chrome_latest', 'run_Windows10_edge_latest', 'run_Windows7_ie_11']
      }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-concurrent');

    // register tasks
    grunt.registerTask('default', ['concurrent:runtest']);

    grunt.registerTask('run_Windows7_firefox_latest', ['shell:runTests:"Windows 7":firefox:latest']);
    grunt.registerTask('run_Windows10_chrome_latest', ['shell:runTests:"Windows 10":chrome:latest']);
    grunt.registerTask('run_Windows10_edge_latest', ['shell:runTests:"Windows 10":MicrosoftEdge:latest']);
    grunt.registerTask('run_Windows7_ie_11', ['shell:runTests:"Windows 7":"internet explorer":11']);
};
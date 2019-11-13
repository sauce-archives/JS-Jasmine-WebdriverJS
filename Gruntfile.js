'use strict';

module.exports = function (grunt) {
    // configure tasks
    grunt.initConfig({
      shell: {
        runTests: {
            command: function(platform, browser, version) {
              return 'PLATFORM='+platform+' BROWSER='+browser+' VERSION='+version+' ./node_modules/.bin/jasmine-node sampleSpec.js'
            }
        }
      },

      parallel: {
        assets: {
            options: {
                grunt: true
            },
            tasks: ['run_Windows7_firefox_latest', 'run_Windows10_chrome_latest', 'run_Windows10_edge_latest', 'run_Windows7_ie_11']
        }
      }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-parallel');
    grunt.loadNpmTasks('grunt-shell');

    // register tasks
    grunt.registerTask('default', ['parallel']);

    grunt.registerTask('run_Windows7_firefox_latest', ['shell:runTests:"Windows 7":firefox:latest']);
    grunt.registerTask('run_Windows10_chrome_latest', ['shell:runTests:"Windows 10":chrome:latest']);
    grunt.registerTask('run_Windows10_edge_latest', ['shell:runTests:"Windows 10":MicrosoftEdge:latest']);
    grunt.registerTask('run_Windows7_ie_11', ['shell:runTests:"Windows 7":"internet explorer":11']);
};
var myReporter = {
    specStarted: function(result) {
        result.title = result.fullName.slice(0, result.fullName.indexOf(result.description) - 1)
        jasmine.currentTest = result
    },
    
    specDone: function(result) {
        jasmine.currentTest = result
        console.log(jasmine.currentTest)
    },
  };

  module.exports = myReporter
  
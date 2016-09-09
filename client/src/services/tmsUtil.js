(function() {
  angular.module('tmsApp').factory('tmsUtil', [
    function() {
      var processHttpError;
      processHttpError = function(res) {
        var data;
        data = res.data;
        if (data.message) {
          return alert(data.message);
        }
      };
      return {
        processHttpError: processHttpError
      };
    }
  ]);

}).call(this);

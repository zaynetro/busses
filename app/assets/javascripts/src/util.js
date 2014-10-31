/**
 * Utilities
 */

module.exports = {

  xhr : function (method, url, cb) {

    request = new XMLHttpRequest();
    request.open(method, url, true);

    request.onload = function () {
      if (this.status >= 200 && this.status < 400){
        cb(null, this.response);
      } else {
        cb(new Error('Fetching error'));
      }
    };

    request.onerror = function () {
      cb(new Error('Connection error'));
    };

    request.send();
  }

}

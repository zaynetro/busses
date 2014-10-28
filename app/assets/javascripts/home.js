// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


var xhr = function (method, url, cb) {

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

};

window.onload = function () {

  var searchEl = document.querySelector('#search');
  var stopsEl = document.querySelector('#stops');

  searchEl.addEventListener('keyup', function () {

    var num = searchEl.value;

    xhr('GET', '/stops.json?number=' + num, function (err, data) {
      if(err) return console.log(err);

      data = JSON.parse(data);
      stopsEl.innerText = JSON.stringify(data, null, '\t');
    });
  }, false);

};

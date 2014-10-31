/**
 * Initialize application
 */

var React = require('react');
var App = require('./components/app');

window.onload = function () {
  console.log('Start');
  React.render(<App />, document.querySelector('#app'));
};

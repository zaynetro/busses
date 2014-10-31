/**
 * Timetable
 */

var React = require('react');
var util = require('../util');

module.exports = React.createClass({
  getInitialState : function () {
    return  { times : [] };
  },

  componentDidMount : function () {
    util.xhr('GET', '/api/timetables.json?stop=' + this.props.num, function (err, data) {
      if(err) return console.log(err);
      this.setState({ times : JSON.parse(data) });
    }.bind(this));
  },

  render : function () {
    return (
      <li>Stop: {this.props.num} <br />Times: {this.state.times.length}</li>
    );
  }
});

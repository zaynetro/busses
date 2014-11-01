/**
 * Timetable
 */

var React = require('react');
var util = require('../util');

module.exports = React.createClass({
  getInitialState : function () {
    return  {
      items : [],
      hidden : []
    };
  },

  componentDidMount : function () {
    util.xhr('GET', '/api/timetables.json?stop=' + this.props.stop, function (err, data) {
      if(err) return console.log(err);
      if(this.isMounted()) {
        this.setState({ items : JSON.parse(data) });
      }
    }.bind(this));
  },

  componentWillUnmount : function () {
    // Stop xhr request
  },

  compareTime : function (time, now) {
    // Doesn't work with night time
    var d = new Date(time);
    var d_start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var n = new Date(now);
    var n_start = new Date(n.getFullYear(), n.getMonth(), n.getDate());

    return (d - d_start) > (n - n_start);
  },

  render : function () {
    var now = Date.now();

    var filterTime = function (item) {
      return this.compareTime(item.time, now);
    }.bind(this);

    var filterRoute = function (item) {
      return this.state.hidden.indexOf(item.route) === -1;
    }.bind(this);

    var createItem = function (item) {
      var d = new Date(item.time);
      var time = util.leadingZero(d.getHours()) + ':' + util.leadingZero(d.getMinutes());

      return (
        <li className='timetable-entry'>{time} Bus #{item.route}</li>
      );
    };

    return (
      <div className='timetable'>
        <h2 className='timetable-stop-num'>Stop: {this.props.stop}</h2>
        <ul className='timetable-routes'></ul>
        <ul className='timetable-entries'>
        {this.state.items.filter(filterTime).filter(filterRoute).map(createItem)}
        </ul>
      </div>
    );
  }
});

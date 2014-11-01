/**
 * Timetable
 */

var React = require('react');
var util = require('../util');

module.exports = React.createClass({
  getInitialState : function () {
    return  { items : [] };
  },

  componentDidMount : function () {
    util.xhr('GET', '/api/timetables.json?stop=' + this.props.num, function (err, data) {
      if(err) return console.log(err);
      if(this.isMounted()) this.setState({ items : JSON.parse(data) });
    }.bind(this));
  },

  componentWillUnmount : function () {
    // Stop xhr request
  },

  render : function () {
    var kids = [];

    this.state.items.forEach(function (item) {
      var times = item.times.map(function (time) {
        var d = new Date(time);
        return util.leadingZero(d.getHours()) + ':' + util.leadingZero(d.getMinutes());
      });

      kids.push(<li className='timetable-entry'>Bus: {item.route}<br />Times: {times.join("; ")}</li>)
    });

    return (
      <li>
        <ul>
          <li className='timetable-stop-num'>Stop: {this.props.num}</li>
          {kids}
        </ul>
      </li>
    );
  }
});

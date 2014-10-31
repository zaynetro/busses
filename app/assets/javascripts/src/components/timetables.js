/**
 * Timetables
 */

var React = require('react');

var Timetable = require('./timetable');

module.exports = React.createClass({
  render : function () {
    var timetables = [];
    this.props.stops.forEach(function (stop) {
      var key = 'timetable-' + stop;
      timetables.push(<Timetable key={key} num={stop} />);
    });

    return (
      <ul className='timetables'>{timetables}</ul>
    );
  }
});

/**
 * Stop
 */

var React = require('react');

var Stop = require('./stop');
var Timetable = require('./timetable');

module.exports = React.createClass({
  getInitialState : function () {
    return  { selected : null };
  },

  handleStopSelect : function (stop_num, is_checked) {
    var num = is_checked ? stop_num : null;
    this.setState({ selected : num });
  },

  render : function () {
    var self = this;

    var createStop = function (stop) {
      var key = 'stop-'+stop.num;
      return (
        <Stop
          key={key}
          data={stop}
          onStopSelect={self.handleStopSelect}
          checked={self.state.selected === stop.num}
          {...stop}
        />
      );
    };

    var loadTimetable = function (stop_num) {
      if(!stop_num) return;
      var key = 'timetable-'+stop_num;
      return (<Timetable key={key} stop={self.state.selected} />);
    };

    return (
      <div>
        <ul className='bus-stops'>{this.props.items.map(createStop)}</ul>
        {loadTimetable(this.state.selected)}
      </div>
    );
  }
});

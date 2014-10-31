/**
 * Stop
 */

var React = require('react');

var Stop = require('./stop');
var Timetables = require('./timetables');

module.exports = React.createClass({
  getInitialState : function () {
    return  { selected : [] };
  },

  handleStopSelect : function (stop_num, is_checked) {
    var selected = this.state.selected;
    var index;

    if((index = selected.indexOf(stop_num)) === -1 && is_checked) {
      selected.push(stop_num);
    } else if(!is_checked) selected.splice(index, 1);

    this.setState({ selected : selected });
  },

  render : function () {
    var self = this;

    var stops = [];
    this.props.items.forEach(function (stop) {
      var key = 'stop-'+stop.num;
      stops.push(
        <Stop
          key={key}
          data={stop}
          onStopSelect={self.handleStopSelect}
        />
      );
    }.bind(this));

    return (
      <div>
        <ul className='bus-stops'>{stops}</ul>
        <Timetables stops={this.state.selected} />
      </div>
    );
  }
});

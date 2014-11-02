/**
 * Timetable
 */

var React = require('react');
var util = require('../util');

module.exports = React.createClass({
  getInitialState : function () {
    return  {
      items : [],
      hidden : [],
      now : Date.now(),
      showAll : false
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

  getTimeFromNoon : function (time) {
    var d = new Date(time);
    var d_start = new Date(d.getFullYear(), d.getMonth(), d.getDate());

    return (d - d_start);
  },

  getTimeDiff : function (time, time2) {
    var d = this.getTimeFromNoon(time);
    var d_2 = this.getTimeFromNoon(time2);

    return (d - d_2);
  },

  routeChange : function (e) {
    var checked = e.target.checked;
    var route = e.target.dataset.route;
    var hidden = this.state.hidden;
    var index;

    if(!checked) {
      hidden.push(route);
      this.setState({ hidden : hidden });
    } else if((index = hidden.indexOf(route)) !== -1) {
      hidden.splice(index, 1);
      this.setState({ hidden : hidden });
    }
  },

  toggleTimes : function (e) {
    this.setState({ showAll : e.target.checked });
  },

  render : function () {

    var routes = [];
    this.state.items.forEach(function (item) {
      if(routes.indexOf(item.route) === -1) routes.push(item.route);
    });

    var createRoute = function (route) {
      var id = 'timetable-route-' + route;
      return (
        <li className='timetable-route' key={id}>
          <input
            type='checkbox'
            id={id}
            onChange={this.routeChange}
            data-route={route}
            checked={this.state.hidden.indexOf('' + route) === -1}
          />
          <label htmlFor={id}>Bus #{route}</label>
        </li>
      );
    }.bind(this);

    var filterTime = function (item) {
      if(this.state.showAll) return true;
      return this.getTimeDiff(item.time, this.state.now) > 0;
    }.bind(this);

    var filterRoute = function (item) {
      return this.state.hidden.indexOf('' + item.route) === -1;
    }.bind(this);

    var createItem = function (item, i) {
      var d = new Date(item.time);
      var time;

      /*
      if(i == 0) {
        time = Math.floor((this.getTimeDiff(item.time, this.state.now)) / 1000 / 60);
        return (
          <li className='timetable-entry-huge'>
            <span>Next bus</span><span className='timetable-entry-huge-time'><small>in</small>{time}</span><span>minutes</span>
          </li>
        );
      }*/

      time = util.leadingZero(d.getHours()) + ':' + util.leadingZero(d.getMinutes());

      return (
        <li className='timetable-entry'>{time} Bus #{item.route}</li>
      );
    }.bind(this);

    return (
      <div className='timetable'>
        <h2 className='timetable-stop-num'>Stop: {this.props.stop}</h2>
        <div>
          <input
            type='checkbox'
            onChange={this.toggleTimes}
            checked={this.state.showAll}
          />
          <label>Toggle times</label>
        </div>
        <ul className='timetable-routes'>
        {routes.map(createRoute)}
        </ul>
        <ul className='timetable-entries'>
        {this.state.items.filter(filterTime).filter(filterRoute).map(createItem)}
        </ul>
      </div>
    );
  }
});

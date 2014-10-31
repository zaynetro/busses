/**
 * App
 */

var React = require('react');

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

var sampleStops = [
  {
    created_at: "2014-10-28T08:17:26.855Z",
    name: "Ritzinkuja",
    num: 1616,
    updated_at: "2014-10-28T08:17:26.855Z"
  },
  {
    created_at: "2014-10-28T08:30:03.514Z",
    name: "Kesakatu",
    num: 42,
    updated_at: "2014-10-28T08:30:03.514Z"
  }
];

window.onload = function () {

  var Timetable = React.createClass({
    getInitialState : function () {
      return  { times : [] };
    },

    loadTable : function () {
      xhr('GET', '/api/timetables.json?stop=' + this.props.num, function (err, data) {
        if(err) return console.log(err);
        this.setState({ times : JSON.parse(data) });
      }.bind(this));
    },

    render : function () {
      if(!this.state.times.length) this.loadTable();

      return (
        <li>Stop: {this.props.num} <br />Times: {this.state.times.length}</li>
      );
    }
  });

  var Timetables = React.createClass({
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

  var Stop = React.createClass({
    /*
    propTypes : {
      num : React.PropTypes.number.isRequired,
      name : React.PropTypes.string
    },
    */

    onChange : function (e) {
      this.props.onStopSelect(this.props.data.num, e.target.checked);
    },

    render : function () {
      return (
        <li className='bus-stop-item'>
          <input
            type='checkbox'
            id={this.props.data.num}
            onChange={this.onChange}
          />
          <label htmlFor={this.props.data.num}>
            <div className='bus-stop-num'>{this.props.data.num}</div>
            <div className='bus-stop-name'>{this.props.data.name}</div>
          </label>
        </li>
      );
    }
  });

  var Stops = React.createClass({
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

  var App = React.createFactory(React.createClass({
    getInitialState : function () {
      return { items : sampleStops };
    },

    onKeyUp : function (e) {
      var self = this;
      xhr('GET', '/api/stops.json?num=' + e.target.value, function (err, data) {
        if(err) return console.log(err);
        self.setState({ items : JSON.parse(data) });
      });
    },

    render : function () {
      return (
        <div className='app'>
          <h1>Search</h1>
          <div className='search-container'>
            <input
              type='text'
              className='search-field'
              autoFocus='true'
              onKeyUp={this.onKeyUp}
              placeholder='Start typing bus stop'
            />
          </div>
          <Stops items={this.state.items} />
        </div>
      );
    }
  }));

  React.render(<App />, document.querySelector('#app'));
};

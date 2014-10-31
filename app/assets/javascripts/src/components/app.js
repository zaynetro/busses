/**
 * App
 */

var React = require('react');
var util = require('../util');

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

var Stops = require('./stops');

module.exports = React.createFactory(React.createClass({
  getInitialState : function () {
    return { items : sampleStops };
  },

  onKeyUp : function (e) {
    util.xhr('GET', '/api/stops.json?num=' + e.target.value, function (err, data) {
      if(err) return console.log(err);
      this.setState({ items : JSON.parse(data) });
    }.bind(this));
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


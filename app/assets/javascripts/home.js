// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


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

  var Timetable = React.createClass({ displayName : 'Timetable',
    render : function () {
      return React.DOM.li(null, 'Item');
    }
  });

  var Timetables = React.createClass({ displayName : 'Timetables',
    getInitialState : function () {
      return { items : this.props.selected };
    },

    render : function () {
      return React.DOM.ul({ className : 'timetables' }, this.state.items.map(Timetable));
    }
  });

  var Stop = React.createClass({ displayName : 'Stop',
    propTypes : {
      num : React.PropTypes.number.isRequired,
      name : React.PropTypes.string
    },

    onChange : function (e) {
      var index;
      if((index = this.props.selected.indexOf(this.props.num)) !== -1) {
        this.props.selected.splice(index, 1);
      } else this.props.selected.push(this.props.num);
    },

    render : function () {
      return (
        React.DOM.li({
            className : 'bus-stop-item'
          },
          React.DOM.input({
              type : 'checkbox',
              onChange : this.onChange,
              id : this.props.num
            }),
          React.DOM.label({
              htmlFor : this.props.num
            },
            React.DOM.div({ className : 'bus-stop-num' }, this.props.num),
            React.DOM.div({ className : 'bus-stop-name' }, this.props.name)
          )
        )
      );
    }
  });

  var Stops = React.createClass({ displayName : 'Stops',
    getInitialState : function () {
      return  { selected : [] };
    },

    render : function () {
      var self = this;
      return (
        React.DOM.div(null,
          React.DOM.ul({ className : 'bus-stops' },
            this.props.items.map(function (stop) {
              stop.key = stop.num;
              stop.selected = self.state.selected;

              return Stop(stop);
            })
          ),
          Timetables({ selected : self.state.selected })
        )
      );
    }
  });

  var App = React.createFactory(React.createClass({ displayName : 'App',
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
        React.DOM.div({ className : 'app' },
          React.DOM.h1(null, 'Search'),
          React.DOM.div({ className : 'search-container' },
            React.DOM.input({
              onKeyUp : this.onKeyUp,
              placeholder : 'Start typing bus stop',
              className : 'search-field',
              autoFocus : 'true'
            })
          ),
          Stops({ items : this.state.items })
        )
      );
    }
  }));

  React.render(<App />, document.querySelector('#app'));
};



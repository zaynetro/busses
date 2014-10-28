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
    id: 1,
    name: "Ritzinkuja",
    number: 1616,
    updated_at: "2014-10-28T08:17:26.855Z"
  },
  {
    created_at: "2014-10-28T08:30:03.514Z",
    id: 3,
    name: "Kesakatu",
    number: 42,
    updated_at: "2014-10-28T08:30:03.514Z"
  }
];

window.onload = function () {

  /*var Timetable = React.createClass({ displayName : 'Timetable',

  });*/

  var Stop = React.createClass({ displayName : 'Stop',

    propTypes : {
      number : React.PropTypes.number.isRequired,
      name : React.PropTypes.string
    },

    onClick : function (e) {
      e.preventDefault();
      console.log(this.props.id);
    },

    render : function () {
      return (
        React.DOM.li(null,
          React.DOM.a({
              href : '#' + this.props.number,
              onClick : this.onClick,
              key : this.props.id
            }, this.props.number + ' - ' + this.props.name)
        )
      );
    }
  });


  var Stops = React.createClass({ displayName : 'Stops',
    render : function () {
      return React.DOM.ul({ className : 'bus-stops' }, this.props.items.map(Stop));
    }
  });

  var App = React.createClass({ displayName : 'App',
    getInitialState : function () {
      return { items : sampleStops };
    },

    onKeyUp : function (e) {
      var self = this;
      xhr('GET', '/stops.json?number=' + e.target.value, function (err, data) {
        if(err) return console.log(err);
        self.setState({ items : JSON.parse(data) });
      });
    },

    render : function () {
      return (
        React.DOM.div(null,
          React.DOM.h3(null, 'Search'),
          React.DOM.input({
            onKeyUp : this.onKeyUp,
            placeholder : 'Start typing bus stop'
          }),
          Stops({ items : this.state.items })
        )
      );
    }
  });

  React.renderComponent(App(null), document.querySelector('#app'));

};



/**
 * Stop
 */

var React = require('react');

module.exports = React.createClass({
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

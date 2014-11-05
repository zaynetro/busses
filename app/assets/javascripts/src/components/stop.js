/**
 * Stop
 */

var React = require('react');

module.exports = React.createClass({
  onChange : function (e) {
    this.props.onStopSelect(this.props.num, e.target.checked);
  },

  render : function () {
    return (
      <li className='bus-stop-item'>
        <input
          type='checkbox'
          id={this.props.num}
          onChange={this.onChange}
          checked={this.props.checked}
        />
        <label htmlFor={this.props.num}>
          <div className='bus-stop-num'>{this.props.num}</div>
          <div className='bus-stop-name'>{this.props.name}</div>
        </label>
      </li>
    );
  }
});

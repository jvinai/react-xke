React = require('react');

var PlaceBox = require('./PlaceBox');

var Place = React.createClass({
  render: function () {
    return (
      <div>
        <div> {this.props.name}</div>
        <PlaceBox id={this.props.id + '_left'} reservation={this.props.reservation.left}/>
        <PlaceBox id={this.props.id + '_right'} reservation={this.props.reservation.right}/>
      </div>
    );
  }
});

module.exports = Place;

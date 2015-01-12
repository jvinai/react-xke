var React = require('react'),
  PLACES_EVENT = require('../constant/places.constant');

var PlaceBox = React.createClass({
  propTypes: {
    nickname: React.PropTypes.string,
    reserved: React.PropTypes.bool.isRequired,
    id: React.PropTypes.string.isRequired
  },
  openForm: function () {
    if (!this.props.reserved) {
      window.dispatchEvent(new CustomEvent(PLACES_EVENT.PLACES_OPEN_FORM, {detail: {id: this.props.id}}));
    }
  },
  render: function () {
    return (
      <div onClick={this.openForm} className={'box ' + this.props.reserved}>
      {this.props.nickname || 'Emplacement libre'}
      </div>
    );
  }
});

module.exports = PlaceBox;

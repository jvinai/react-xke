var React = require('react'),
  PLACES_EVENT = require('../constant/places.constant');

var nickname = '';
var PlaceBox = React.createClass({
  getNickname: function () {
    return nickname;
  },
  openForm: function () {
    if (!this.props.reservation.reserved) {
      window.dispatchEvent(new CustomEvent(PLACES_EVENT.PLACES_OPEN_FORM, {detail: {id: this.props.id}}));
    }
  },
  getInitialState: function () {
    nickname = this.props.reservation.nickname;
    return {};
  },
  componentDidMount: function () {
    var self = this;
    window.addEventListener('validation_' + this.props.id, function (event) {
      self.props.reservation.reserved = true;
      nickname = event.detail.nickname;
      self.forceUpdate();
    });
  },
  render: function () {
    return (
      <div onClick={this.openForm} className={'box ' + this.props.reservation.reserved}>
      {this.getNickname() || 'Emplacement libre'}
      </div>
    );
  }
});

module.exports = PlaceBox;

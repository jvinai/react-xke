var React = require('react');

var PlaceBox = require('./PlaceBox');

var Place = React.createClass({
  propTypes: {
    reservation: React.PropTypes.shape({
        right: React.PropTypes.shape({
          nickname: React.PropTypes.string,
          reserved: React.PropTypes.bool.isRequired
        }),
        left: React.PropTypes.shape({
          nickname: React.PropTypes.string,
          reserved: React.PropTypes.bool.isRequired
        })
    }),
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired
  },
  getInitialState: function () {
    return {
      nicknameR: this.props.reservation.right.nickname,
      reservedR: this.props.reservation.right.reserved,
      nicknameL: this.props.reservation.left.nickname,
      reservedL: this.props.reservation.left.reserved
    }
  },
  componentDidMount: function () {
    var self = this;
    window.addEventListener('validation_' + this.props.id + '_left', function (event) {
      self.setState({
        nicknameL: event.detail.nickname,
        reservedL: true
      });
    });

    window.addEventListener('validation_' + this.props.id + '_right', function (event) {
      self.setState({
        nicknameR: event.detail.nickname,
        reservedR: true
      });
    });
  },

  render: function () {
    return (
      <div>
        <div> {this.props.name}</div>
        <PlaceBox nickname={this.state.nicknameL} reserved={this.state.reservedL} id={this.props.id + '_left'}/>
        <PlaceBox nickname={this.state.nicknameR} reserved={this.state.reservedR} id={this.props.id + '_right'}/>
      </div>
    );
  }
});

module.exports = Place;

var React = require('react'),
  PLACES_EVENT = require('../constant/places.constant');

var UserForm = React.createClass({
  getInitialState: function () {
    return {show: false};
  },
  componentDidMount: function () {
    var self = this;
    window.addEventListener(PLACES_EVENT.PLACES_OPEN_FORM, function (event) {
      self.setState({show: true, id: event.detail.id});
    });
  },
  validation: function () {
    var nickname = this.refs.nickname.getDOMNode().value;
    if (!nickname || nickname === '') {
      return;
    }

    window.dispatchEvent(new CustomEvent('validation_' + this.state.id, {detail: {nickname: nickname}}));
    this.replaceState({show: false});
    this.refs.nickname.getDOMNode().value = '';
  },
  render: function () {
    return (
      <div className={'user-form col-md-6 ' + this.state.show}>
        <div className='form-group'>
          <label for='nickname'>Pseudo</label>
          <input ref='nickname' type='input' className='form-control' id='nickname' placeholder='Pseudo ...'/>
        </div>
        <button type='submit' className='btn btn-default' onClick={this.validation}>Valider</button>
      </div>
    );
  }
});

module.exports = UserForm;

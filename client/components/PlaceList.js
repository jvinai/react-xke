var React = require('react'),
  PlacesService = require('../services/places.service'),
  PLACES_EVENT = require('../constant/places.constant');

var Place = require('./Place');

var placesService = new PlacesService();
var PlaceList = React.createClass({
  getInitialState: function () {
    return {data: placesService.getPlaces()};
  },
  componentDidMount: function () {
    var self = this;
    window.addEventListener(PLACES_EVENT.PLACES_UPDATED, function () {
      self.setState({data: placesService.getPlaces()});
    });
  },
  render: function () {
    return (
      <div className='list col-md-6'>
      {this.state.data.map(function (data) {
        return <Place key={data.id} name={data.name} reservation={data.reservation} id={data.id}/>;
      })}
      </div>
    );
  }
});

module.exports = PlaceList;

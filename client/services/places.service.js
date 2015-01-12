'use strict';

var $ = require('jQuery'),
  bluebird = require('bluebird'),
  PLACES_EVENT = require('../constant/places.constant');

var places = [];

var PlacesService = function () {
  $.getJSON('/api/places').then(function (response) {
    places = response;
    window.dispatchEvent(new CustomEvent(PLACES_EVENT.PLACES_UPDATED));
  });
};

PlacesService.prototype.getPlaces = function () {
  return places;
};

module.exports = PlacesService;

export default class GoogleAdapter {
  constructor (input, map) {
    this.input = input;
    this.map = map;

    if (input) this.initAutocomplete();
    if (map) this.initMap();

    return this;
  }

  initMap () {
    const map = new google.maps.Map(this.map, {
      center: { lat: 0, lng: 0 },
      zoom: 8
    });

    if (this.autocomplete) this.autocomplete.bindTo('bounds', map);

    return map;
  }

  initAutocomplete () {
    this.autocomplete = new google.maps.places.Autocomplete(this.input, {types: ['geocode']});
    this.autocomplete.addListener('place_changed', this.fillInAddress.bind(this));

    return this.autocomplete;
  }

  fillInAddress () {
    var place = this.autocomplete.getPlace();
    if (this.input.onchange) this.input.onchange(place);

    const map = this.initMap(this.map);
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    marker.setVisible(false);

    if (!place.geometry) {
      window.alert('No details available for input: \'' + place.name + '\'');
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    return place;
  }
}

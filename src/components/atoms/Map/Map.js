import GoogleAdapter from '../../../adapters/googleAdapter';
require('./Map.scss');

export default class Map {
  constructor ({ id }) {
    const div = document.createElement('div');
    const map = new GoogleAdapter(null, div).map;

    this.component = document.createElement('div');
    this.component.className = `map__container ${id}`;
    this.component.appendChild(map);

    return this;
  }
}

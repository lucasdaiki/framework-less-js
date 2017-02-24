import GoogleAdapter from '../../../adapters/googleAdapter';
import Input from '../../atoms/Input';

require('./AutoCompleteAddress.scss');

export default class AutoCompleteAddress extends Input {
  constructor (properties, Adapter = GoogleAdapter) {
    super(properties);
    this.Adapter = Adapter;

    const input = this.component.querySelector('input');
    const map = document.createElement('div');
    map.classList.add('map__container');
    this.component.appendChild(map);

    const googleData = new this.Adapter(input, map);
    googleData.input.placeholder = '';
    googleData.input.addEventListener('change', this.handleChange.bind(this));

    return this;
  }

  handleChange (place = {}) {
    this.onChange(this.id, place.formatted_address || this.input.value);
    this.validateEmpty(place.formatted_address || this.input.value);
    this.value = place;
  }
}

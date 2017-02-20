import Title from '../../atoms/Title';
import createField from './createField';

export default class Form {
  constructor (fields) {
    this.data = {};
    this.component = document.createElement('form');
    this.component.className = 'form';

    const title = new Title({ text: 'Form' });
    this.component.appendChild(title);

    fields.forEach(field => this.component.appendChild(createField(field, this.handleChange.bind(this), this.component)));

    return this;
  }

  handleChange (key, value) {
    this.data[key] = value;
    console.log(this.data);
    return this;
  }
}

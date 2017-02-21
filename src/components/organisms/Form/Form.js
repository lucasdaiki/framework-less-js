import Title from '../../atoms/Title';
import createField from './createField';

export default class Form {
  constructor (fields) {
    this.data = {};
    this.fieldElements = [];
    this.fields = fields;
    this.component = document.createElement('form');
    this.component.className = 'form';

    const title = new Title({ text: 'Form' });
    this.component.appendChild(title);

    fields.forEach(field => {
      const fieldElement = createField(field, this.handleChange.bind(this), this.component);
      this.fieldElements.push(fieldElement);
    });

    this.fieldElements.forEach(field => this.component.appendChild(field));

    return this;
  }

  handleChange (key, value) {
    this.data[key] = value;
    console.log(this.data);
    return this;
  }
}

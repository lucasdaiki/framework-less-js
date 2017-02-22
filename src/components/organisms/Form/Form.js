import Router from '../../../routes/Router';

import Title from '../../atoms/Title';
import createField from './createField';

require('./Form.scss');

export default class Form {
  constructor (fields, id, PersonRepository, titleLabel = 'Person form') {
    this.PersonRepository = PersonRepository;
    this.id = id;
    this.data = PersonRepository.get(id) || {};
    this.fieldElements = [];
    this.fields = fields;
    this.component = document.createElement('form');
    this.component.className = 'form__container';
    this.component.addEventListener('submit', this.handleSave.bind(this));

    const title = new Title({ text: titleLabel });
    this.component.appendChild(title);

    fields.forEach(field => {
      field.value = this.data[field.id];
      const fieldElement = createField(field, this.handleChange.bind(this), this.component);
      this.fieldElements.push(fieldElement);
    });

    this.fieldElements.forEach(field => this.component.appendChild(field));

    return this;
  }

  handleChange (key, value) {
    this.data[key] = value;
    return this;
  }

  handleSave (e) {
    if (this.id) this.PersonRepository.edit(this.data, this.id);
    else this.PersonRepository.save(this.data);

    Router.go('list');
    e.preventDefault();
  }
}

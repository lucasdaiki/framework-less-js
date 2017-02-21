import ItemRepository from '../../../repositories/PersonRepository';
import Router from '../../../routes/Router';

import Title from '../../atoms/Title';
import createField from './createField';

require('./Form.scss');

export default class Form {
  constructor (fields, titleLabel = 'Person form') {
    this.data = {};
    this.fieldElements = [];
    this.fields = fields;
    this.component = document.createElement('form');
    this.component.className = 'form__container';
    this.component.addEventListener('submit', this.handleSave.bind(this));

    const title = new Title({ text: titleLabel });
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
    return this;
  }

  handleSave (e) {
    ItemRepository.save(this.data);
    Router.go('list');
    e.preventDefault();
  }
}

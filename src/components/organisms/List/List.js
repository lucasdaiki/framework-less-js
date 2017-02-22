import Router from '../../../routes/Router';
import createCard from './createCard';

require('./List.scss');

export default class List {
  constructor (persons, PersonRepository, titleLabel = 'Person List') {
    this.PersonRepository = PersonRepository;

    this.data = {};
    this.personElements = [];
    this.persons = persons;
    this.component = document.createElement('div');
    this.component.classList.add('list__page');

    const list = document.createElement('div');
    list.classList.add('list__items');
    this.list = list;

    const container = document.createElement('div');
    container.classList.add('list__container');
    container.appendChild(list);

    persons.forEach(person => {
      const personElement = createCard(person, this.handleEdit, this.handleDelete.bind(this));
      this.personElements.push(personElement);
    });

    this.personElements.forEach(person => list.appendChild(person));
    this.component.appendChild(container);

    return this;
  }

  handleEdit (id) {
    Router.go('form', { id });
  }

  handleDelete (id, rowElement) {
    this.PersonRepository.delete(id);
    this.list.removeChild(rowElement);
  }
}

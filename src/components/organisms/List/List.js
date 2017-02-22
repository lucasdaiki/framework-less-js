import Router from '../../../routes/Router';
import Title from '../../atoms/Title';
import Button, { BUTTON_COLOR_TYPES } from '../../atoms/Button';
import defaultAvatar from '../../../img/avatar.png';

require('./List.scss');

const createRow = (person, handleEdit, handleDelete) => {
  const row = document.createElement('div');
  row.classList.add('list__item');

  const avatar = document.createElement('img');
  avatar.classList.add('list__item__avatar');
  avatar.src = person.uplImage || defaultAvatar;

  const name = document.createElement('span');
  name.classList.add('list__item__name');
  name.innerText = person.txtFullname;

  const edditButton = new Button({
    placeholder: 'Edit',
    type: 'button',
    onClick: () => handleEdit(person.id)
  }).component;

  edditButton.classList.add('list__item__edit-button');

  const deleteButton = new Button({
    placeholder: 'Delete',
    type: 'button',
    onClick: () => handleDelete(person.id, row),
    color: BUTTON_COLOR_TYPES.SECONDARY
  }).component;

  deleteButton.classList.add('list__item__delete-button');

  row.appendChild(avatar);
  row.appendChild(name);
  row.appendChild(edditButton);
  row.appendChild(deleteButton);

  return row;
};


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
      const personElement = createRow(person, this.handleEdit, this.handleDelete.bind(this));
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

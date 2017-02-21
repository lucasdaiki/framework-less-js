import Router from '../../../routes/Router';
import Title from '../../atoms/Title';
import Button from '../../atoms/Button';

require('./List.scss');

const createRow = person => {
  const row = document.createElement('div');
  row.classList.add('list__row');

  const avatar = document.createElement('img');
  avatar.classList.add('list__row__avatar');
  avatar.file = person.uplImage;

  const name = document.createElement('span');
  name.classList.add('list__row__name');
  name.innerText = person.txtFullname;

  const button = new Button({
    placeholder: 'Edit',
    type: 'button',
    onClick: () => Router.go('form', { id: person.id })
  }).component;

  button.classList.add('list__row__edit-button');

  row.appendChild(avatar);
  row.appendChild(name);
  row.appendChild(button);

  return row;
};


export default class List {
  constructor (persons, PersonRepository, titleLabel = 'Person List') {
    this.PersonRepository = PersonRepository;

    this.data = {};
    this.personElements = [];
    this.persons = persons;
    this.component = document.createElement('div');
    this.component.classList.add('list__container');

    const title = new Title({ text: titleLabel });
    this.component.appendChild(title);

    const list = document.createElement('div');
    list.classList.add('list__items');

    persons.forEach(person => {
      const personElement = createRow(person);
      this.personElements.push(personElement);
    });

    this.personElements.forEach(person => list.appendChild(person));
    this.component.appendChild(list);

    return this;
  }
}

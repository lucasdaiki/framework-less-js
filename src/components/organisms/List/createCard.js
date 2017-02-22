import Button, { BUTTON_COLOR_TYPES } from '../../atoms/Button';
import defaultAvatar from '../../../img/avatar.png';

const createCard = (person, handleEdit, handleDelete) => {
  const card = document.createElement('div');
  card.classList.add('list__item');

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
    onClick: () => handleDelete(person.id, card),
    color: BUTTON_COLOR_TYPES.SECONDARY
  }).component;

  deleteButton.classList.add('list__item__delete-button');

  card.appendChild(avatar);
  card.appendChild(name);
  card.appendChild(edditButton);
  card.appendChild(deleteButton);

  return card;
};

export default createCard;

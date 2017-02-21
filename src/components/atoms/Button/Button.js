require('./Button.scss');

const COLOR_TYPES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
};

export default class Button {
  constructor ({ placeholder = '', color = COLOR_TYPES.PRIMARY, type = 'submit', onClick = () => {} }) {
    const button = document.createElement('button');
    button.innerHTML = placeholder;
    button.setAttribute('type', type);
    button.classList.add('button__container');
    button.classList.add(`--${color}`);
    button.addEventListener('click', onClick);

    this.component = button;
    return this;
  }
}

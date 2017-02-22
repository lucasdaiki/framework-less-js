require('./Button.scss');

const BUTTON_COLOR_TYPES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
};

export default class Button {
  constructor ({ placeholder = '', color = BUTTON_COLOR_TYPES.PRIMARY, type = 'submit', onClick = () => {} }) {
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

export { BUTTON_COLOR_TYPES };

require('./Button.scss');

const TYPES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
};

export default class Button {
  constructor ({ placeholder = '', type = TYPES.PRIMARY }) {
    const button = document.createElement('button');
    button.innerHTML = placeholder;
    button.setAttribute('type', 'submit');
    button.classList.add('button__container');
    button.classList.add(`--${type}`);

    this.component = button;
    return this;
  }
}

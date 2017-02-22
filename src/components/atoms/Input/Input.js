require('./Input.scss');

export default class Input {
  constructor ({ value = '', placeholder = '', id = '', className = '', validator, onChange }) {
    this.validator = validator;
    this.value = value;
    this.empty = value === undefined || value.toString().trim().length === 0;
    this.id = id;
    this.onChange = onChange;

    const container = document.createElement('div');
    container.className = `input__container ${className} ${id}`;

    if (this.empty) container.classList.add('--empty');

    this.input = this.buildInput({ validator });
    const label = this.buildLabel({ placeholder });
    const bar = this.buildBar();

    container.appendChild(this.input);
    container.appendChild(label);
    container.appendChild(bar);

    this.component = container;

    if (!this.empty) {
      this.input.onchange();
      if (this.input.onkeyup) this.input.onkeyup({ target: this.input });
    }

    return this;
  }

  buildInput ({ validator }) {
    const input = document.createElement('input');
    input.classList.add('input__field');
    input.setAttribute('type', 'text');
    input.setAttribute('required', true);
    input.setAttribute('value', this.value);
    input.setAttribute('name', this.id);
    input.setAttribute('autocomplete', 'off');

    input.onkeyup = validator && this.handleValidate.bind(this);
    input.onchange = this.handleChange.bind(this);

    return input;
  }

  buildLabel ({ placeholder }) {
    const label = document.createElement('label');
    label.textContent = placeholder;
    label.classList.add('input__label');

    return label;
  }

  buildBar () {
    const bar = document.createElement('span');
    bar.classList.add('input__bar');
    return bar;
  }

  handleChange ({ target = { event } } = {}) {
    this.onChange(this.id, target.value);
    this.validateEmpty();
    this.value = target.value;
  }

  validateEmpty () {
    this.empty = this.input.value.trim().length === 0;

    if (this.empty) this.component.classList.add('--empty');
    else this.component.classList.remove('--empty');
  }

  handleValidate ({ target = { event } } = {}) {
    if (target.value === this.value) return;
    this.value = target.value;
    this.validateEmpty();

    const validationResult = this.validator(target.value);
    if (!validationResult) return;

    if (validationResult.valid) {
      this.component.classList.remove('--error');
      this.component.classList.add('--success');
      target.value = validationResult.parsed;
      target.setCustomValidity('');
      this.onChange(this.id, validationResult.parsed);
    } else {
      this.component.classList.remove('--success');
      this.component.classList.add('--error');
      target.setCustomValidity('Invalid field');
    }
  }
}

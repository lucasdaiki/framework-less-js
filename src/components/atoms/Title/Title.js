const SIZES = {
  large: 'h1',
  medium: 'h2',
  small: 'h3'
};

export default class Title {
  constructor ({ size = 'medium', text = '', className = '' }) {
    const title = document.createElement(SIZES[size]);
    title.className = `title ${className}`;
    title.textContent = text;

    return title;
  }
}

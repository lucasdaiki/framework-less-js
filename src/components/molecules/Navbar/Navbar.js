require('./Navbar.scss');

export default class Navbar {
  constructor (links, onClick) {
    const nav = document.createElement('nav');
    nav.classList.add('nav');

    Object.keys(links).forEach(link => {
      if (!link) return;

      const linkElement = document.createElement('a');
      linkElement.addEventListener('click', () => onClick(link));
      linkElement.textContent = links[link].name;
      linkElement.classList.add('nav__link');

      if (location.hash.startsWith(`#${link}`)) linkElement.classList.add('--active');

      nav.appendChild(linkElement);
    });

    this.component = nav;

    return this;
  }
}

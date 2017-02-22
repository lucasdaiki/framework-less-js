import ROUTES from './routes';
import { getHash } from './parsers';
import Navbar from '../components/molecules/Navbar';

export default class Router {
  static go (hash = '', params) {
    if (hash.startsWith('#')) hash = hash.replace('#', '');
    if (hash) location.hash = `#${hash}`;
    if (params) location.hash += `?id=${params.id}`;

    const page = ROUTES[getHash(hash)];
    if (!page) {
      location.hash = '';
      return page.render();
    }

    document.querySelector('.main').innerHTML = '';
    document.querySelector('.main').appendChild(new Navbar(ROUTES, Router.go).component);
    document.querySelector('.main').appendChild(page.render(hash, params));
  }
}

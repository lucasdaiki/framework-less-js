import formPage from './pages/formPage';
import listPage from './pages/listPage';

const ROUTES = {
  'form': (id) => formPage(id),
  'list': () => listPage
};

function getHash (route) {
  return route.split('?')[0];
}

function getParam (route, param) {
  return route.split(`${param}=`)[1];
}

export default class Router {
  static go (hash = '') {
    if (hash.startsWith('#')) hash = hash.replace('#', '');
    if (hash) location.hash = `#${hash}`;

    const page = ROUTES[getHash(hash)](getParam(hash, 'id'));
    if (!page) location.hash = '';

    document.querySelector('.main').appendChild(page);
  }

  static startup () {
    window.onhashchange = ({ oldURL, newURL }) => {
      if (newURL !== oldURL) Router.go(newURL.split('#')[1]);
    };
  }
}

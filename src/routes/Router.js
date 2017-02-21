import formPage from './pages/formPage';
import listPage from './pages/listPage';

const ROUTES = {
  'form': (hash, params) => {
    const id = params ? params.id : getParam(hash, 'id');
    return formPage(id);
  },
  'list': listPage,
  '': listPage
};

function getHash (route) {
  return route.split('?')[0];
}

function getParam (route, param) {
  return route.split(`${param}=`)[1];
}

export default class Router {
  static go (hash = '', params) {
    if (hash.startsWith('#')) hash = hash.replace('#', '');
    if (hash) location.hash = `#${hash}`;
    if (params) location.hash += `?id=${params.id}`;

    const page = ROUTES[getHash(hash)];
    if (!page) {
      location.hash = '';
      return page;
    }

    document.querySelector('.main').innerHTML = '';
    document.querySelector('.main').appendChild(page(hash, params));
  }
}

import formPage from './pages/formPage';

const ROUTES = {
  'form': formPage,
  'list': formPage
};

export default class Router {
  static go (hash) {
    location.hash = hash ? `#${hash}` : location.hash;

    const page = ROUTES[hash.split('?')[0]];
    if (!page) location.hash = '';
    document.querySelector('.main').appendChild(page);
  }

  static startup () {
    window.onhashchange = ({ oldURL, newURL }) => {
      if (newURL !== oldURL) Router.go(newURL.split('#')[1]);
    };
  }
}


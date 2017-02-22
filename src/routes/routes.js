import formPage from './pages/formPage';
import listPage from './pages/listPage';
import { getParam } from './parsers';

const ROUTES = {
  'form': {
    name: 'Form',
    render: (hash, params) => {
      const id = params ? params.id : getParam(hash, 'id');
      return formPage(id);
    }
  },
  'list': {
    name: 'List',
    render: listPage
  },
  '': {
    name: 'List',
    render: listPage
  }
};

export default ROUTES;

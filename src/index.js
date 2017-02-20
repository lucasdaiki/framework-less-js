require('./scss/base.scss');

import Form from './components/organisms/Form';
import { fields } from './mock/mock.json';

const form = new Form(fields);

document.querySelector('.main').appendChild(form.component);

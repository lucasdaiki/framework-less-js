import PersonRepository from '../../repositories/PersonRepository';
import Form from '../../components/organisms/Form';
import Router from '../Router';

import { fields } from '../../mock/fields.json';

export default (id) => {
  const form = new Form(fields, id, PersonRepository, Router);
  return form.component;
};

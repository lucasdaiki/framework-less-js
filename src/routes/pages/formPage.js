import Form from '../../components/organisms/Form';
import { fields } from '../../mock/fields.json';

export default (id) => {
  console.log(id)
  const form = new Form(fields);
  return form.component;
};

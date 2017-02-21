import Form from '../../components/organisms/Form';
import { fields } from '../../mock/fields.json';

export default () => {
  const form = new Form(fields);
  return form.component;
};

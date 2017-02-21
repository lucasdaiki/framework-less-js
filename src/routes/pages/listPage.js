import PersonRepository from '../../repositories/PersonRepository';
import List from '../../components/organisms/List';
import { persons } from '../../mock/persons.json';

export default (id) => {
  const list = new List(persons, PersonRepository);
  return list.component;
};

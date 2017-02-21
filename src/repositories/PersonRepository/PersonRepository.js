import { persons } from '../../mock/persons.json';

export default class PersonRepository {
  static get (id) {
    return persons.find(person => person.id === id);
  }

  static save (person) {
    person.id = Math.floor(Math.random() * 10000000000).toString();
    persons.push(person);
    return person;
  }

  static edit (person, id) {
    return persons.push(person);
  }

  static delete (id) {
    persons = persons.filter(person => person.id !== id);
  }

  static all () {
    return persons;
  }
}

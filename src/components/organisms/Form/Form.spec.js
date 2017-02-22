import sinon from 'sinon';
import Form from './Form';
import validators from './validators';

const fields = [ { id: 'test' } ];

const PersonRepository = {
  get: sinon.spy(),
  save: sinon.spy(),
  edit: sinon.spy()
};

const Router = { go: sinon.spy() };

describe('#Form', () => {
  test('should render', () => {
    const form = new Form([]);
    expect(form.component).toBeDefined();
  });

  test('should render a default field', () => {
    const form = new Form(fields);
    expect(form.fields.length).toEqual(1);
  });

  test('should change data', () => {
    const form = new Form(fields, null, PersonRepository);
    form.handleChange('any', 'thing');
    expect(form.data.any).toEqual('thing');
  });

  describe('#handleChange', () => {
    test('save if has no id', () => {
      const form = new Form(fields, null, PersonRepository, Router);
      form.handleSave({ preventDefault: sinon.spy() });
      expect(PersonRepository.save.called).toBeTruthy();
    });

    test('edit if has id', () => {
      const form = new Form(fields, 10, PersonRepository, Router);
      form.handleSave({ preventDefault: sinon.spy() });
      expect(PersonRepository.edit.called).toBeTruthy();
    });
  });

  describe('#validators', () => {
    describe('#cpfValidator', () => {
      test('should validate a valid cpf', () => {
        const cpf = '12312312312';
        const validatedCPF = validators.CPF(cpf);
        expect(validatedCPF.valid).toBeTruthy();
        expect(validatedCPF.cpf).toEqual(cpf);
        expect(validatedCPF.parsed).toEqual('123.123.123-12');
      });

      test('should invalidate a valid cpf', () => {
        const cpf = '1231231231';
        const validatedCPF = validators.CPF(cpf);
        expect(validatedCPF.valid).toBeFalsy();
        expect(validatedCPF.cpf).toEqual(cpf);
        expect(validatedCPF.parsed).toBeUndefined();
      });
    });

    describe('#phoneValidator', () => {
      test('should validate a valid phone (8 digits)', () => {
        const phone = '1111111111';
        const validatedPhone = validators.PHONE(phone);
        expect(validatedPhone.valid).toBeTruthy();
        expect(validatedPhone.phone).toEqual(phone);
        expect(validatedPhone.parsed).toEqual('(11) 1111 - 1111');
      });

      test('should validate a valid phone (9 digits)', () => {
        const phone = '11111111111';
        const validatedPhone = validators.PHONE(phone);
        expect(validatedPhone.valid).toBeTruthy();
        expect(validatedPhone.phone).toEqual(phone);
        expect(validatedPhone.parsed).toEqual('(11) 11111 - 1111');
      });

      test('should validate a invalid phone', () => {
        const phone = '123';
        const validatedPhone = validators.PHONE(phone);
        expect(validatedPhone.valid).toBeFalsy();
        expect(validatedPhone.phone).toEqual(phone);
        expect(validatedPhone.parsed).toBeUndefined();
      });
    });

    describe('#requiredValidator', () => {
      test('should invalidate a empty string', () => {
        const validated = validators.REQUIRED('');
        expect(validated.valid).toBeFalsy();
        expect(validated.value).toEqual('');
        expect(validated.parsed).toEqual('');
      });

      test('should validate a filled string', () => {
        const validated = validators.REQUIRED('123');
        expect(validated.valid).toBeTruthy();
        expect(validated.value).toEqual('123');
        expect(validated.parsed).toEqual('123');
      });
    });
  });
});

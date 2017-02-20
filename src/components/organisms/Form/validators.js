const cpfParser = cpf => {
  return `${cpf.substring(0, 3)}.` +
         `${cpf.substring(3, 6)}.` +
         `${cpf.substring(6, 9)}-` +
         `${cpf.substring(9, 12)}`;
};

const phoneParser = phone => {
  const nineDigitsNumber = phone.length === 11;
  let index = nineDigitsNumber ? 7 : 6;

  return `(${phone.substring(0, 2)}) ` +
         `${phone.substring(2, index)} - ` +
         `${phone.substring(index, index + 4)}`;
};

const cpfValidator = cpf => {
  cpf = cpf.replace(/[\s.-]/g, '');
  const match = new RegExp(/^\d{11}$/).test(cpf);

  if (!match) return { cpf, valid: false };
  return { cpf, valid: true, parsed: cpfParser(cpf) };
};

const phoneValidator = phone => {
  phone = phone.replace(/[\s()-.]/g, '');
  const match = new RegExp(/^\d{10,11}$/).test(phone);

  if (!match) return { phone, valid: false };
  return { phone, valid: true, parsed: phoneParser(phone) };
};

const requiredValidator = value => {
  const valid = typeof value === 'boolean' || !!value;
  return { value, valid, parsed: value };
};

const validators = {
  CPF: cpfValidator,
  PHONE: phoneValidator,
  REQUIRED: requiredValidator
};

export default validators;

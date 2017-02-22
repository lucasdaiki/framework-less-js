import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import UploadImage from '../../atoms/UploadImage';
import AutoCompleteAddress from '../../molecules/AutoCompleteAddress';
import validators from './validators';

const PROPERTIES = {
  txtFullname: {
    label: 'Full Name',
    Component: Input,
    validator: validators.REQUIRED
  },
  txtCpf: {
    label: 'CPF',
    validator: validators.CPF,
    Component: Input
  },
  txtTelephone: {
    label: 'Phone',
    validator: validators.PHONE,
    Component: Input
  },
  txtAddress: {
    label: 'Address',
    Component: AutoCompleteAddress,
    validator: validators.REQUIRED
  },
  txtComplement: {
    label: 'Complement',
    Component: Input
  },
  uplImage: {
    label: 'Image',
    Component: UploadImage
  },
  btnSave: {
    label: 'Save',
    Component: Button
  }
};

export default PROPERTIES;

const defaultField = { Component: Input };
export { defaultField };

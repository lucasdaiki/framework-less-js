import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import Map from '../../atoms/Map';
import UploadImage from '../../atoms/UploadImage';
import AutoCompleteAddress from '../../molecules/AutoCompleteAddress';
import validators from './validators';

const PROPERTIES = {
  txtFullname: {
    label: 'Full Name',
    component: Input,
    validator: validators.REQUIRED
  },
  txtCpf: {
    label: 'CPF',
    validator: validators.CPF,
    component: Input
  },
  txtTelephone: {
    label: 'Phone',
    validator: validators.PHONE,
    component: Input
  },
  txtAddress: {
    label: 'Address',
    component: AutoCompleteAddress,
    validator: validators.REQUIRED,
    onChange: (form, value) => {
      // DO ANYTHING
    }
  },
  mapRenderer: {
    label: 'Map',
    component: Map // DOING
  },
  txtComplement: {
    label: 'Complement',
    component: Input,
    validator: validators.REQUIRED
  },
  uplImage: {
    label: 'Image',
    component: UploadImage // TODO
  },
  imgAvatar: {
    label: 'Avatar',
    component: Input // TODO
  },
  btnSave: {
    label: 'Save',
    component: Button // DOING
  }
};

export default PROPERTIES;

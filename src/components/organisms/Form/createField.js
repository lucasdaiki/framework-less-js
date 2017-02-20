import FIELDS_PROPERTIES from './fieldsProperties';

const createField = (field, updateForm, form) => {
  const fieldProperty = FIELDS_PROPERTIES[field.id];
  const Component = fieldProperty.component;

  return new Component({
    value: field.value,
    id: field.id,
    placeholder: fieldProperty.label,
    validator: fieldProperty.validator,
    connectedField: fieldProperty.connectedField,
    onChange: updateForm
  }).component;
};

export default createField;

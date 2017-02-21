import FIELDS_PROPERTIES, { defaultField } from './fieldsProperties';

const createField = (field, updateForm, form) => {
  let fieldProperty = FIELDS_PROPERTIES[field.id] || defaultField;

  return new fieldProperty.Component({
    value: field.value,
    id: field.id,
    placeholder: fieldProperty.label || field.name,
    validator: fieldProperty.validator,
    connectedField: fieldProperty.connectedField,
    onChange: updateForm
  }).component;
};

export default createField;

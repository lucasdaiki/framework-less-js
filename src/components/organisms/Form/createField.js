import FIELDS_PROPERTIES from './fieldsProperties';

const handleChange = (updateForm, onChange, key, value, form) => {
  updateForm(key, value);
  if (!onChange) return;
  onChange(form, value);
};

const createField = (field, updateForm, form) => {
  const fieldProperty = FIELDS_PROPERTIES[field.id];
  const Component = fieldProperty.component;

  return new Component({
    value: field.value,
    id: field.id,
    placeholder: fieldProperty.label,
    validator: fieldProperty.validator,
    onChange: (key, value) => {
      handleChange(updateForm, fieldProperty.onChange, key, value, form);
    }
  }).component;
};

export default createField;

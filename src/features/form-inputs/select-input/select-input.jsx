import { useField } from 'formik';
import React from 'react';
import { FormField, Label, Select } from 'semantic-ui-react';

const SelectInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Select
        {...props}
        {...field}
        clearable
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}{' '}
        </Label>
      ) : null}
    </FormField>
  );
};

export default SelectInput;

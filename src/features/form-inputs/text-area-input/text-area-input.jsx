import { useField } from 'formik';
import React from 'react';
import { FormField, Label } from 'semantic-ui-react';

const TextAreaInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    // !! - casting to boolean
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red" style={{ marginTop: '10px' }}>
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
};

export default TextAreaInput;

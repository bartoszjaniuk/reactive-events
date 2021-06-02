import { Form, Formik } from 'formik';
import { Button } from 'semantic-ui-react';
import TextAreaInput from '../../form-inputs/text-area-input/text-area-input';
import TextInput from '../../form-inputs/text-input/text-input';
import * as Yup from 'yup';
import { updateUserProfile } from '../../../app/firebase/firestoreService';

const ProfileForm = ({ profile }) => {
  const initialValues = {
    displayName: profile.displayName,
    description: profile.description || '',
  };
  const validationSchema = Yup.object({
    displayName: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateUserProfile(values);
        } catch (error) {
          alert(error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <TextInput name="displayName" placeholder="Display name" />
          <TextAreaInput name="description" placeholder="Description" />
          <Button
            loading={isSubmitting}
            type="submit"
            size="large"
            content="Update Profile"
            positive
            disabled={isSubmitting || !isValid || !dirty}
            floated="right"
          />
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;

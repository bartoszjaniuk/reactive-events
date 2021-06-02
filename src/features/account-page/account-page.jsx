import { Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Label, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import { updateUserPassword } from '../../app/firebase/firebaseService';
import TextInput from '../form-inputs/text-input/text-input';

const AccountPage = () => {
  const { currentUser } = useSelector(state => state.user);
  console.log(currentUser);
  const initialValues = {
    newPassword: '',
    confirmNewPassword: '',
  };
  const validationSchema = Yup.object({
    newPassword: Yup.string().required('Password is required'),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      'Passwords do not match'
    ),
  });

  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      {currentUser?.providerId === 'password' && (
        <>
          <Header color="purple" sub content="Change Password" />
          <p>Use this form to change your password</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                await updateUserPassword(values);
              } catch (error) {
                setErrors({ auth: error.message });
                console.log();
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, isSubmitting, isValid, dirty }) => (
              <Form className="ui form">
                <TextInput name="newPassword" type="password" placeholder="New password" />
                <TextInput
                  name="confirmNewPassword"
                  type="password"
                  placeholder="Confirm new password"
                />
                {errors.auth && (
                  <Label basic color="red" style={{ paddingTop: 10 }} content={errors.auth} />
                )}
                <Button
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting}
                  size="large"
                  positive
                  content="Update password"
                  loading={isSubmitting}
                  style={{ display: 'block' }}
                />
              </Form>
            )}
          </Formik>
        </>
      )}
      {currentUser?.providerId === 'facebook.com' && (
        <>
          <Header color="purple" sub content="Facebook account" />
          <p>Please visit Facebook to update your account</p>
          <Button
            icon="facebook"
            color="facebook"
            as={Link}
            to="https://www.facebook.com/"
            content="Go to Facebook"
          />
        </>
      )}
      {currentUser?.providerId === 'google.com' && (
        <>
          <Header color="purple" sub content="Google account" />
          <p>Please visit Google to update your account</p>
          <Button
            icon="google"
            color="google plus"
            as={Link}
            to="https://www.google.com/"
            content="Go to google"
          />
        </>
      )}
    </Segment>
  );
};

export default AccountPage;

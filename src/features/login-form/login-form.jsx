import { Formik, Form } from 'formik';
import React from 'react';
import ModalWrapper from '../modal-wrapper/modal-wrapper';
import * as Yup from 'yup';
import TextInput from '../form-inputs/text-input/text-input';
import { Button, Divider, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/redux/modals/modal.actions';
import { signInWithEmail } from '../../app/firebase/firebaseService';
import SocialLogin from '../social-login/social-login';

const LoginForm = () => {
  const dispatch = useDispatch();
  return (
    <ModalWrapper size="large" header="Sign in to Re-vents">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signInWithEmail(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setErrors({
              auth: 'Invalid username or password',
            });
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="ui form">
            <TextInput name="email" placeholder="Email Address" />
            <TextInput name="password" placeholder="Password" type="password" />
            {errors.auth && (
              <Label basic color="red" style={{ marginBottom: 10 }} content={errors.auth} />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="purple"
              content="Login"
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default LoginForm;

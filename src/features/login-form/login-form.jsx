import { Formik, Form } from 'formik';
import React from 'react';
import ModalWrapper from '../modal-wrapper/modal-wrapper';
import * as Yup from 'yup';
import TextInput from '../form-inputs/text-input/text-input';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { userSignIn } from '../../app/redux/user/user.actions';
import { closeModal } from '../../app/redux/modals/modal.actions';

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
        onSubmit={(values, { setSubmitting }) => {
          dispatch(userSignIn(values));
          setSubmitting(false);
          dispatch(closeModal());
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="ui form">
            <TextInput name="email" placeholder="Email Address" />
            <TextInput name="password" placeholder="Password" type="password" />

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Login"
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default LoginForm;

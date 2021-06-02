import { Form, Formik } from 'formik';
import { Button, Divider, Label } from 'semantic-ui-react';
import TextInput from '../form-inputs/text-input/text-input';
import ModalWrapper from '../modal-wrapper/modal-wrapper';
import * as Yup from 'yup';
import { registerInFirebase } from '../../app/firebase/firebaseService';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/redux/modals/modal.actions';
import SocialLogin from '../social-login/social-login';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    displayName: '',
    email: '',
    password: '',
  };

  const handleOnSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await registerInFirebase(values);
      setSubmitting(false);
      dispatch(closeModal());
    } catch (error) {
      setErrors({
        auth: error.message,
      });
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    displayName: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  return (
    <ModalWrapper size="large" header="Register to Reactive Events ">
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="ui form">
            <TextInput name="displayName" placeholder="Your name" />
            <TextInput name="email" placeholder="Email" />
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
              content="Create new account!"
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default RegisterForm;

import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../login-form/login-form';
import RegisterForm from '../register-form/register-form';

const ModalManager = () => {
  const modalLookUp = {
    LoginForm,
    RegisterForm,
  };
  const currentModal = useSelector(state => state.modal);
  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookUp[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderedModal}</span>;
};

export default ModalManager;

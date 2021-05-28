import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../login-form/login-form';

const ModalManager = () => {
  const modalLookUp = {
    LoginForm,
  };
  const currentModal = useSelector(state => state.modal);
  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    console.log('ModalLookUp: ', modalLookUp);
    const ModalComponent = modalLookUp[modalType];
    console.log('ModalComponent = modalLookUp[modalType]', ModalComponent);
    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderedModal}</span>;
};

export default ModalManager;

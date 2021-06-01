import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { closeModal } from '../../app/redux/modals/modal.actions';

const ModalWrapper = ({ children, size, header }) => {
  const dispatch = useDispatch();
  const open = true;
  useEffect(() => {
    return () => {
      dispatch(closeModal());
    };
  }, [open]);
  return (
    <Modal open={open} onClose={() => dispatch(closeModal())} size={size}>
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

export default ModalWrapper;

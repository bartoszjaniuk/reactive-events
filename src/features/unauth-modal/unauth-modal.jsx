import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Divider, Modal} from 'semantic-ui-react';
import {openModal} from '../../app/redux/modals/modal.actions';

const UnauthModal = ({history, setModalOpen}) => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const {prevLocation} = useSelector(state => state.user);

  const handleClose = () => {
    if (!history) {
      setOpen(false);
      setModalOpen(false);
      return;
    }

    if (history && prevLocation) {
      history.push(prevLocation.pathname);
    } else {
      history.push('/events');
    }
    setOpen(false);
  };

  const handleOpenLoginModal = modalType => {
    dispatch(openModal({modalType}));
    setOpen(false);
    setModalOpen(false);
  };
  return (
    <Modal open={open} sizie="mini" onClose={handleClose}>
      <Modal.Header content="You need to be signed in to do that!" />
      <Modal.Content>
        <p>Log in or register to see this content</p>
        <Button.Group>
          <Button
            fluid
            color="purple"
            content="Login"
            onClick={() => handleOpenLoginModal('LoginForm')}
          />
          <Button.Or />
          <Button
            fluid
            color="green"
            content="Register"
            onClick={() => handleOpenLoginModal('RegisterForm')}
          />
        </Button.Group>
        <Divider />
        <div style={{textAlign: 'center'}}>
          <p>Click cancel to continue as a guest</p>
          <Button onClick={handleClose} content="Cancel" color="red" />
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default UnauthModal;

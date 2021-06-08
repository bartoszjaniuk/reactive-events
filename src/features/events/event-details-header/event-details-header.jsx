import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Header, Image, Item, Segment} from 'semantic-ui-react';
import {addUserAttendance, cancelUserAttendance} from '../../../app/firebase/firestoreService';
import UnauthModal from '../../unauth-modal/unauth-modal';

const overlayStyle = {
  filter: 'brightness(70%)',
};

const eventContentStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  color: 'white',
};

const EventDetailsHeader = ({event, isHost, isGoing}) => {
  const [loading, setLoading] = useState(false);
  const {authenticated} = useSelector(state => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const handleUserJoinToEvent = async () => {
    setLoading(true);
    try {
      await addUserAttendance(event);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserLeaveEvent = async () => {
    setLoading(true);
    try {
      await cancelUserAttendance(event);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {modalOpen && <UnauthModal setModalOpen={setModalOpen} />}
      <Segment.Group>
        <Segment basic attached="top" style={{padding: 0}}>
          <Image src={'/assets/events/crossfit.jpg'} fluid style={overlayStyle} />
          <Segment basic style={eventContentStyle} textAlign="center">
            <Item.Group>
              <Item.Content>
                <Header size="huge" content={event.title} style={{color: 'white'}} />
              </Item.Content>
            </Item.Group>
          </Segment>
        </Segment>
        <Segment attached="bottom clearing">
          {!isHost && (
            <>
              {isGoing ? (
                <Button
                  content="Cancel my place"
                  onClick={handleUserLeaveEvent}
                  loading={loading}
                />
              ) : (
                <Button
                  color="purple"
                  content="Join this event"
                  onClick={authenticated ? handleUserJoinToEvent : () => setModalOpen(true)}
                  loading={loading}
                />
              )}
            </>
          )}

          {isHost && (
            <Button
              as={Link}
              to={`/manage/${event.id}`}
              color="orange"
              content="Manage event"
              floated="right"
            />
          )}
        </Segment>
      </Segment.Group>
    </>
  );
};

export default EventDetailsHeader;

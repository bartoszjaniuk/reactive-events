import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { getUserProfile } from '../../../app/firebase/firestoreService';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToSelectedCurrentUserProfile } from '../../../app/redux/profile/profileActions';
import EventListItemPlaceholder from '../../events/event-list-item-placeholder/event-list-item-placeholder';
import ProfileContent from '../profile-content/profile-content';
import ProfileHeader from '../profile-header/profile-header';

const ProfilePage = ({ match }) => {
  const dispatch = useDispatch();
  const { selectedUserProfile } = useSelector(state => state.profile);
  const { currentUser } = useSelector(state => state.user);
  const { loading, error } = useSelector(state => state.async);

  useFirestoreDoc({
    firestoreQuery: () => getUserProfile(match.params.id),
    data: profile => dispatch(listenToSelectedCurrentUserProfile(profile)),
    deps: [dispatch, match.params.id],
  });

  if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error))
    return <EventListItemPlaceholder />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          profile={selectedUserProfile}
          isCurrentUser={currentUser.uid === selectedUserProfile.id}
        />
        <ProfileContent
          profile={selectedUserProfile}
          isCurrentUser={currentUser.uid === selectedUserProfile.id}
        />
      </Grid.Column>
    </Grid>
  );
};

export default ProfilePage;

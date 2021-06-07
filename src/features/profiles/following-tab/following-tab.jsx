import { useDispatch, useSelector } from 'react-redux';
import { Card, Grid, Header, Tab } from 'semantic-ui-react';
import {
  getFollowersCollection,
  getFollowingCollection,
} from '../../../app/firebase/firestoreService';
import useFireStoreCollection from '../../../app/hooks/useFireStoreCollection';
import { listenToFollowers, listenToFollowings } from '../../../app/redux/profile/profileActions';
import ProfileCard from '../profile-card/profile-card';

const FollowingTab = ({ profile, activeTab }) => {
  const dispatch = useDispatch();
  const { followings, followers } = useSelector(state => state.profile);
  useFireStoreCollection({
    firestoreQuery:
      activeTab === 3
        ? () => getFollowersCollection(profile.id)
        : () => getFollowingCollection(profile.id),
    data: data =>
      activeTab === 3 ? dispatch(listenToFollowers(data)) : dispatch(listenToFollowings(data)),
    dependencies: [activeTab, dispatch],
  });
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={activeTab === 3 ? 'Followers' : 'Following'}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {activeTab === 3 &&
              followers.map(follower => <ProfileCard profile={follower} key={follower.id} />)}
            {activeTab === 4 &&
              followings.map(following => <ProfileCard profile={following} key={following.id} />)}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default FollowingTab;

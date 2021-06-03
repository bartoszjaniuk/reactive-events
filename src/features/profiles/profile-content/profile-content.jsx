import { Tab } from 'semantic-ui-react';
import AboutTab from '../about-tab/about-tab';
import PhotosTab from '../photos-tab/photos-tab';

const ProfileContent = ({ profile, isCurrentUser }) => {
  const panes = [
    {
      menuItem: 'About',
      render: () => (
        <Tab.Pane>
          <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Photos',
      render: () => <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />,
    },
    { menuItem: 'Events', render: () => <Tab.Pane>Events</Tab.Pane> },
    { menuItem: 'Followers', render: () => <Tab.Pane>Followers</Tab.Pane> },
    { menuItem: 'Following', render: () => <Tab.Pane>Following</Tab.Pane> },
  ];
  return <Tab menu={{ fluid: true, vertical: true }} menuPosition="right" panes={panes} />;
};

export default ProfileContent;

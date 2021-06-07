import { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import AboutTab from '../about-tab/about-tab';
import EventsTab from '../events-tab/events-tab';
import FollowingTab from '../following-tab/following-tab';
import PhotosTab from '../photos-tab/photos-tab';

const ProfileContent = ({ profile, isCurrentUser }) => {
  const [activeTab, setActiveTab] = useState(0);
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
    {
      menuItem: 'Events',
      render: () => (
        <Tab.Pane>
          <EventsTab profile={profile} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Followers',
      render: () => (
        <Tab.Pane>
          <FollowingTab key={profile.id} profile={profile} activeTab={activeTab} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Following',
      render: () => (
        <Tab.Pane>
          <FollowingTab key={profile.id} profile={profile} activeTab={activeTab} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
};

export default ProfileContent;

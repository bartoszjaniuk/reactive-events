import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

const EventFilters = () => {
  return (
    <>
      <Menu vertical size="large" style={{ width: '100%' }}>
        <Header icon="filter" attached color="purple" content="Filters" />
        <Menu.Item content="All events" />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Header icon="calendar" attached color="purple" content="Select date" />
      <Calendar />
    </>
  );
};

export default EventFilters;

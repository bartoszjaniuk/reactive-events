import GoogleMapReact from 'google-map-react';
import React from 'react';
import {Icon, Segment} from 'semantic-ui-react';

const Marker = () => {
  return <Icon name="marker" size="big" color="red" />;
};

const EventDetailsMap = ({latLng}) => {
  const zoom = 14;
  return (
    <Segment attached="bottom" style={{padding: 0}}>
      <div style={{height: 300, width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{key: process.env.REACT_APP_MAPS_KEY}}
          center={latLng}
          zoom={zoom}
        >
          <Marker lat={latLng.lat} lng={latLng.lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDetailsMap;

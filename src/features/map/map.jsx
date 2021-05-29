import React, { Component, useState } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const SimpleMap = () => {
  const [defaultProps, setDefaultProps] = useState({
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  });

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBLpapYrk3MzO0L3YeQyI_J-CcV8edhSy0' }}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;

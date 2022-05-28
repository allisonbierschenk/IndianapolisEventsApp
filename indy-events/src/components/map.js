import React, { useState } from "react";
import "./map.css";
import { useMemo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const [map, setMap] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB3IN9Vn1VXoS_VS1U6TXlAG5Gn2y__wqs",
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 44, lng: -80 }}
      mapContainerClassName="map-container"
      onLoad={(map) => setMap(map)}
    >
      <Marker position={{ lat: 44, lng: -80 }} />
    </GoogleMap>
  );
}

export default Map;

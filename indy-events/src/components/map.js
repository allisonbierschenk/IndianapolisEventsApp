import React, { useState } from "react";
import "./map.css";
import { useMemo } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

export const Map = (props) => {

  const locations = [
    {
      name: "Location 1",
      location: {
        lat: 41.3954,
        lng: 2.162,
      },
    },
    {
      name: "Location 2",
      location: {
        lat: 41.3917,
        lng: 2.1649,
      },
    },
    {
      name: "Location 3",
      location: {
        lat: 41.3773,
        lng: 2.1585,
      },
    },
    {
      name: "Location 4",
      location: {
        lat: 41.3797,
        lng: 2.1682,
      },
    },
    {
      name: "Location 5",
      location: {
        lat: 41.4055,
        lng: 2.1915,
      },
    },
  ];
  console.log(locations, "locations")
  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };
  // const [map, setMap] = useState(null);
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyB3IN9Vn1VXoS_VS1U6TXlAG5Gn2y__wqs",
  // });

  // if (!isLoaded) return <div>Loading...</div>;

  return (
    <LoadScript googleMapsApiKey="AIzaSyB3IN9Vn1VXoS_VS1U6TXlAG5Gn2y__wqs">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
        {
            locations.map(item => {
              return (
              <Marker key={item.name} position={item.location}/>
              )
            })
         }
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;

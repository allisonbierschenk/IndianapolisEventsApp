import React, { useState } from "react";
import "./map.css";
import { useMemo } from "react";
import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";
import Geocode from "react-geocode";


export const Map = (props) => {
  const [ selected, setSelected ] = useState({});
  
  const onSelect = item => {
    setSelected(item);
  }
  //extract the addresses into an array
const addresses = props.currentEvents.map(event => event.address)
console.log("addresses:", addresses)

//write a function that uses the addresses array to fill in the geocod
  function setGeocode () {

  }

  //working geocode
  Geocode.setApiKey("AIzaSyB3IN9Vn1VXoS_VS1U6TXlAG5Gn2y__wqs");
  Geocode.fromAddress("801 W. Washington St. Indianapolis, IN 46204").then(
    (response) => {
      const location = response.results[0].geometry.location;
      console.log("location:", location);
    },
    (error) => {
      console.error(error);
    }
    );
    console.log("geocode:", Geocode)

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
  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };


  return (
    <LoadScript googleMapsApiKey="AIzaSyB3IN9Vn1VXoS_VS1U6TXlAG5Gn2y__wqs">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
      {
            locations.map(item => {
              return (
              <Marker key={item.name} 
                position={item.location}
                onClick={() => onSelect(item)}
              />
              )
            })
         }
        {
            selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>{selected.name}</p>
            </InfoWindow>
            )
         }
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;

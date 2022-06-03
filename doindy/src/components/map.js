import React, { useEffect, useState } from "react";
import "./map.css";
import {
  GoogleMap,
  Marker,
  LoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDwN1OfrDC7ToLCVnPn9LJUs68F8-60dbo");

export const Map = (props) => {
  const [selected, setSelected] = useState({});
  const [coords, setCoords] = useState([]);

  const onSelect = (item) => {
    setSelected(item);
  };
  let eventDetails = props.currentEvents;
  console.log("event details:", eventDetails);
  let addresses = props.currentEvents.map((event) => event.address);
  console.log("addresses:", addresses);

  useEffect(() => {
    let locations = [];
    // map the addresses array (which contains all of the addresses of the events dynamically rendering on the page)
    // geocode the address and push to a new array of objects containing the latitude and longitude
    // pass the new array of objects within the Marker to replace the placeholder "locations"
    const setGeocode = async () => {
      for (let i = 0; i < addresses.length; i++) {
        Geocode.fromAddress(addresses).then((response) => {
          let { lat, lng } = response.results[0].geometry.location;
          console.log("response", response);
          console.log("lat,lng", { lat, lng });
          setCoords({ lat, lng });
        });
      }
    };
    setGeocode();
  }, [addresses]);
  console.log("coords:", coords);

  const locations = [
    {
      name: "Location 1",
      location: {
        lat: 39.71627811161605,
        lng: -86.15601952844557,
      },
    },
    {
      name: "Location 2",
      location: {
        lat: 39.79627811161605,
        lng: -86.15601952844557,
      },
    },
    {
      name: "Location 3",
      location: {
        lat: 39.77627811161605,
        lng: -86.18601952844557,
      },
    },
    {
      name: "Location 4",
      location: {
        lat: 39.77927811161605,
        lng: -86.15601952844557,
      },
    },
    {
      name: "Location 5",
      location: {
        lat: 39.77627811161605,
        lng: -86.15701952844557,
      },
    },
  ];
  const defaultCenter = {
    lat: 39.77627811161605,
    lng: -86.15601952844557,
  };
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDwN1OfrDC7ToLCVnPn9LJUs68F8-60dbo">
      <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
        {locations.map((item, index) => {
          return (
            <Marker
              key={index}
              position={item.location}
              onClick={() => onSelect(item)}
            />
          );
        })}
        {selected.location && (
          <InfoWindow
            position={selected.location}
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            <p>{selected.name}</p>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

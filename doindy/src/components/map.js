import React, { useEffect, useState } from "react";
import "./map.css";
import {
  GoogleMap,
  Marker,
  LoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import Geocode from "react-geocode";

Geocode.setApiKey("");

export const Map = (props) => {
  const [selected, setSelected] = useState({});
  const [allLocations, setAllLocations] = useState([]);

  const onSelect = (item) => {
    setSelected(item);
    console.log("item", item);
  };
  console.log("selected:", selected);
  //
  let eventDetails = props.currentEvents;
  console.log("event details:", eventDetails);

  // let addresses = props.currentEvents.map((event) => event.address);
  // console.log("addresses:", addresses);

  // loop the event details array (which contains all of the addresses of the events dynamically rendering on the page)
  // geocode the address and push to a new array of objects containing the latitude and longitude
  // pass the new array of objects within the Marker to replace the placeholder "locations"
  function setGeocode(locales) {
    console.log("locales:", locales);
    locales.forEach((locale) => {
      Geocode.fromAddress(locale.address).then((response) => {
        let { lat, lng } = response.results[0].geometry.location;
        setAllLocations((prevState) => [...prevState, { lat, lng }]);
        console.log("lat,lng", { lat, lng });
        console.log("locale.address:", locale.address);
      });
    });
  }

  useEffect(() => {
    setGeocode(eventDetails);
  }, [eventDetails]);
  console.log("alllocations:", allLocations);

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
    <LoadScript googleMapsApiKey="">
      <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
        {allLocations.map((item, index) => {
          return (
            <Marker
              key={index}
              position={item}
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

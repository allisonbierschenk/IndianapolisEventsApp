import "./App.css";
import axios from "axios";
import Events from "../../indy-events/src/components/events";
import { useEffect, useState } from "react";
import Pagination from "../../indy-events/src/components/pagination";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

const API_KEY = "AIzaSyBuTRGEarfo23MfTdcAEPWj2LYqWrgQYCY";
function Map() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 39.7684, lng: 86.1581 }}
    />
  );
}
const WrappedMap = withScriptjs(withGoogleMap(Map));

const API_URL = "http://localhost:3000/api/v1/events";

async function getAPIdata() {
  const resp = await axios.get(API_URL);
  return resp.data;
}

function App() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(5);

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await getAPIdata();
      setEvents(allEvents);
    };
    fetchEvents();
  }, []);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <Events events={currentEvents} />
      <div style={{ width: "100vw", height: "100vh" }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
      <Pagination
        eventsPerPage={eventsPerPage}
        totalEvents={events.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;

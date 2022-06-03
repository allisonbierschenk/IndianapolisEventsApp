import "./App.css";
import axios from "axios";
import Events from "./components/events";
import { useEffect, useState } from "react";
import Pagination from "./components/pagination";
import Map from "./components/map";
import Geocode from "react-geocode";

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
  console.log(currentEvents, "currentevents");

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <Events events={currentEvents} />
      <Map currentEvents={currentEvents} />
      <Pagination
        eventsPerPage={eventsPerPage}
        totalEvents={events.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;

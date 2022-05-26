import Search from "./search";
import React, { useState } from "react";

function Events(props) {
  const [queriedEvents, setQueriedEvents] = useState([]);

  const handleSearch = (e) => {
    const newQueriedEvents = props.events.filter((event) =>
      event.venue.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setQueriedEvents(newQueriedEvents);
  };

  function sortArray() {
    const sorted = [...props.events].sort((a, b) => {
      return a.title > b.title ? 1 : -1;
    });
    setQueriedEvents(sorted);
  }

  const allEventsJSX = props.events.map((event) => {
    return (
      <div key={event.id}>
        <h2>
          <a href={event.url}> {event.title}</a>
        </h2>
        <p>{event.date}</p>
        <p>Venue: {event.venue}</p>
        <p>Address: {event.address}</p>
      </div>
    );
  });

  const eventsJSX = queriedEvents.map((event) => {
    return (
      <div key={event.id}>
        <h2>
          <a href={event.url}> {event.title}</a>
        </h2>
        <p>{event.date}</p>
        <p>Venue: {event.venue}</p>
        <p>Address: {event.address}</p>
      </div>
    );
  });

  return (
    <div>
      <h1>Do (317) Indy</h1>
      <Search onChange={handleSearch} />
      <button onClick={sortArray}>Sort A to Z</button>
      <div>{queriedEvents.length ? eventsJSX : allEventsJSX}</div>
    </div>
  );
}

export default Events;

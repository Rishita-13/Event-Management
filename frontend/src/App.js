import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

export default function App() {
  const [events, setEvents] = useState([]);
  const fetchEvents = async () =>
    setEvents((await axios.get('https://event-management-sa5j.onrender.com/api/events')).data);

  useEffect(() => { fetchEvents(); }, []);

  return (
    <div className="container">
      <h1>Event Management System</h1>
      <EventForm onSave={fetchEvents} />
      <hr />
      <EventList events={events} refresh={fetchEvents} />
    </div>
  );
}
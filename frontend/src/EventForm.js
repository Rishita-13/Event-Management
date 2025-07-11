import React, { useState } from 'react';
import axios from 'axios';

const EventForm = ({ fetchEvents }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  // ✅ Correct backend URL with proper API path
  const backendURL = 'https://event-management-sa5j.onrender.com/api/events';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(backendURL, { title, description, date });
      fetchEvents();
      setTitle('');
      setDescription('');
      setDate('');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Event</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <br />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <br />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
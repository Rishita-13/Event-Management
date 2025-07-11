import React, { useState } from 'react';
import axios from 'axios';

const EventList = ({ events, fetchEvents }) => {
  const [editingEventId, setEditingEventId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDate, setEditDate] = useState('');

  // ✅ Correct backend URL base
  const backendURL = 'https://event-management-sa5j.onrender.com/api/events';

  const handleDelete = async (id) => {
    try {
      await axios.delete('https://event-management-sa5j.onrender.com/api/events');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event: ' + error.message);
    }
  };

  const startEdit = (event) => {
    setEditingEventId(event._id);
    setEditTitle(event.title);
    setEditDescription(event.description);
    setEditDate(event.date ? event.date.split('T')[0] : '');
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put('https://event-management-sa5j.onrender.com/api/events', {
        title: editTitle,
        description: editDescription,
        date: editDate,
      });
      setEditingEventId(null);
      fetchEvents();
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Error updating event: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Event List</h2>
      {events.map((event) => (
        <div
          key={event._id}
          style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}
        >
          {editingEventId === event._id ? (
            <div>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
              />
              <br />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description"
              />
              <br />
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
              <br />
              <button onClick={() => handleUpdate(event._id)}>Save</button>
              <button onClick={() => setEditingEventId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <button onClick={() => startEdit(event)}>Edit</button>
              <button onClick={() => handleDelete(event._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventList;
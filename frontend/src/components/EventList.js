import React, { useState } from 'react';
import axios from 'axios';

export default function EventList({ events, refresh }) {
  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState({});

  /* ---------- helpers ---------- */
  const remove = async id => {
    await axios.delete(`http://localhost:5000/api/events/${id}`);
    refresh();
  };

  const start = ev => {
    setEditId(ev._id);
    setDraft({
      title: ev.title,
      description: ev.description,
      date: ev.date.split('T')[0], // Trim time from ISO string
    });
  };

  const cancel = () => setEditId(null);

  const save = async id => {
    await axios.put(`http://localhost:5000/api/events/${id}`, draft);
    setEditId(null);
    refresh();
  };

  if (!events.length) return <p>No events yet.</p>;

  return events.map(ev => (
    <div key={ev._id} className="card">
      {editId === ev._id ? (
        <>
          <input
            value={draft.title}
            onChange={e => setDraft({ ...draft, title: e.target.value })}
          />
          <textarea
            value={draft.description}
            onChange={e => setDraft({ ...draft, description: e.target.value })}
          />
          <input
            type="date"
            value={draft.date}
            onChange={e => setDraft({ ...draft, date: e.target.value })}
          />
          <button className="btn-blue" onClick={() => save(ev._id)}>Save</button>
          <button className="btn-ghost" onClick={cancel}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{ev.title}</h3>
          <p>{ev.description}</p>
          <p>{new Date(ev.date).toLocaleDateString()}</p>
          <button className="btn-blue" onClick={() => start(ev)}>✏ Edit</button>
          <button className="btn-red" onClick={() => remove(ev._id)}>🗑 Delete</button>
        </>
      )}
    </div>
  ));
}

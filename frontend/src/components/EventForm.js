import React, { useState } from 'react';
import axios from 'axios';

export default function EventForm({ onSave }) {
  const [form, setForm] = useState({ title:'', description:'', date:'' });
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/events', form);
    setForm({ title:'', description:'', date:'' });
    onSave();
  };

  return (
    <form onSubmit={submit}>
      <input name="title" value={form.title} onChange={handle} placeholder="Title" required />
      <textarea name="description" value={form.description} onChange={handle} placeholder="Description" required />
      <input type="date" name="date" value={form.date} onChange={handle} required />
      <button className="btn-blue">Add Event</button>
    </form>
  );
}
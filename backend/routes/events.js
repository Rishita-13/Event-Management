import express from 'express';
import Event from '../models/Event.js';  // make sure this is default export

const router = express.Router();

/* Add Event --------------------------------------------- */
router.post('/', async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/* Get All Events ---------------------------------------- */
router.get('/', async (_req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/* Update Event ------------------------------------------ */
router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json(updatedEvent);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/* Delete Event ------------------------------------------ */
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;

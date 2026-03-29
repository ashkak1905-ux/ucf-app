import { Router } from 'express';

const router = Router();

// Get all events
router.get('/', (req, res) => {
  res.json({ message: 'Get all events' });
});

// Get a specific event by ID
router.get('/:id', (req, res) => {
  res.json({ message: 'Get event by ID' });
});

// Create a new event
router.post('/', (req, res) => {
  res.json({ message: 'Create a new event' });
});

export default router;
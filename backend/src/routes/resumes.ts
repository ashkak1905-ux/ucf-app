import { Router } from 'express';

const router = Router();

// Get all resumes
router.get('/', (req, res) => {
  res.json({ message: 'Get all resumes' });
});

// Get a specific resume by ID
router.get('/:id', (req, res) => {
  res.json({ message: 'Get resume by ID' });
});

// Upload a new resume
router.post('/', (req, res) => {
  res.json({ message: 'Upload a resume' });
});

export default router;
import { Router } from 'express';

const router = Router();

// Ask the AI tutor a question
router.post('/tutor', (req, res) => {
  res.json({ message: 'AI tutor response' });
});

// Analyze a syllabus
router.post('/syllabus', (req, res) => {
  res.json({ message: 'Syllabus analysis response' });
});

export default router;
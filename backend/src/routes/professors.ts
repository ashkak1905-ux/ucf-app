import { Router } from 'express';
import { getProfessors, getProfessorById, addReview } from '../controllers/professorsController';

const router = Router();

// Get all professors
router.get('/', getProfessors);

// Get a specific professor by ID
router.get('/:id', getProfessorById);

// Add a review for a professor
router.post('/:id/reviews', addReview);

export default router;
import { Request, Response } from 'express';
import { supabase } from '../services/supabaseService';

// Get all professors
export const getProfessors = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('professors')
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch professors' });
  }
};

// Get a specific professor by ID
export const getProfessorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('professors')
      .select('*, reviews(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch professor' });
  }
};

// Add a review for a professor
export const addReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, comment, user_id } = req.body;

    const { data, error } = await supabase
      .from('reviews')
      .insert([{ professor_id: id, rating, comment, user_id }]);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
};
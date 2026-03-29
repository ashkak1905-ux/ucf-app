import { Request, Response } from 'express';
import { supabase } from '../services/supabaseService';

// Get all resumes
export const getResumes = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
};

// Get a specific resume by ID
export const getResumeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
};

// Upload a new resume
export const uploadResume = async (req: Request, res: Response) => {
  try {
    const { user_id, file_url, parsed_text } = req.body;

    const { data, error } = await supabase
      .from('resumes')
      .insert([{ user_id, file_url, parsed_text }]);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload resume' });
  }
};
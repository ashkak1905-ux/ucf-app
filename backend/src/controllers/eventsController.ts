import { Request, Response } from 'express';
import { supabase } from '../services/supabaseService';

// Get all events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get a specific event by ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Create a new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, date, location, description } = req.body;

    const { data, error } = await supabase
      .from('events')
      .insert([{ title, date, location, description }]);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};
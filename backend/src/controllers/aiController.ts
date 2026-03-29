import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// AI Tutor
export const askTutor = async (req: Request, res: Response) => {
  try {
    const { question } = req.body;

    const result = await model.generateContent(question);
    const response = result.response.text();

    res.json({ answer: response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get AI response' });
  }
};

// Syllabus Analyzer
export const analyzeSyllabus = async (req: Request, res: Response) => {
  try {
    const { syllabusText } = req.body;

    const prompt = `Analyze this syllabus and summarize the key information including important dates, assignments, and grading breakdown: ${syllabusText}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ summary: response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze syllabus' });
  }
};
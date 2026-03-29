import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export const askAI = async (prompt: string): Promise<string> => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    throw new Error('Failed to get AI response');
  }
};

export const analyzeSyllabus = async (syllabusText: string): Promise<string> => {
  try {
    const prompt = `Analyze this syllabus and summarize the key information including important dates, assignments, and grading breakdown: ${syllabusText}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    throw new Error('Failed to analyze syllabus');
  }
};
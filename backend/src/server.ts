import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import professorRoutes from './routes/professors';
import eventRoutes from './routes/event';
import studyBuddyRoutes from './routes/studybuddy';
import resumeRoutes from './routes/resumes';
import aiRoutes from './routes/ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/professors', professorRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/studybuddy', studyBuddyRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', aiRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('UCF App Backend is running!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'UCF App Backend is healthy!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
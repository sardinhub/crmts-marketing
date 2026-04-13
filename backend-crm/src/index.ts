import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'CRMTS Backend API is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

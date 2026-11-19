
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import cors from 'cors';
import { env } from './config/env';
import { healthRouter } from './routes/health';
import { pool } from './config/db';
import authRoutes from './routes/auth.routes'
import adminRoutes from './routes/admin.routes'
import recruiterRoutes from "./routes/recruiter.routes.js";

export const app: Application = express();

// Standard middleware
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser())
// Existing routes
app.use('/api', healthRouter);
app.use('/api/auth', authRoutes)

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/recruiter", recruiterRoutes);

// Temporary Supabase database connection test
app.get('/api/db-test', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT NOW() AS current_time'
    );

    res.json({
      success: true,
      message: 'Supabase connected successfully',
      time: result.rows[0].current_time,
    });
  } catch (error) {
    console.error('Database connection failed:', error);

    res.status(500).json({
      success: false,
      message: 'Database connection failed',
    });
  }
});

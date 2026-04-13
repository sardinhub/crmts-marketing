import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
// Note: We'll use a mocked Prisma client for now since we haven't run prisma generate
// but the code should be ready for it.
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Mocking identification for now
  if (email === 'admin@crmts.com' && password === 'admin123') {
    const token = jwt.sign(
      { email, role: 'MANAGER' }, 
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );
    return res.json({ token, user: { email, role: 'MANAGER', name: 'System Admin' } });
  }

  if (email === 'staff@crmts.com' && password === 'staff123') {
    const token = jwt.sign(
      { email, role: 'STAFF' }, 
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );
    return res.json({ token, user: { email, role: 'STAFF', name: 'Marketing Staff' } });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};

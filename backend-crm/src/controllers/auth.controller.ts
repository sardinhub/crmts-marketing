import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (user && user.password === password) {
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1d' }
      );
      return res.json({ token, user: { email: user.email, role: user.role, name: user.name } });
    }

    // Fallback for Demo Account
    if (email === 'admin@crmts.com' && password === 'admin123') {
      const token = jwt.sign({ email, role: 'MANAGER' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
      return res.json({ token, user: { email, role: 'MANAGER', name: 'System Admin' } });
    }

    return res.status(401).json({ message: 'Kredensial tidak valid' });
  } catch (error) {
    return res.status(500).json({ message: 'Sistem error' });
  }
};

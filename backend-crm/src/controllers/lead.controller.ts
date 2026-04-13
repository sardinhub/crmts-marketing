import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getAllLeads = async (req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data leads' });
  }
};

export const importLeads = async (req: Request, res: Response) => {
  const { leads } = req.body;
  
  if (!Array.isArray(leads)) {
    return res.status(400).json({ message: 'Data leads tidak valid' });
  }

  try {
    const result = await prisma.lead.createMany({
      data: leads,
      skipDuplicates: true
    });
    
    res.json({ 
      message: `${result.count} leads berhasil diimpor`,
      count: result.count 
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengimpor leads' });
  }
};

export const updateLeadStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const lead = await prisma.lead.update({
      where: { id },
      data: { status }
    });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui status lead' });
  }
};

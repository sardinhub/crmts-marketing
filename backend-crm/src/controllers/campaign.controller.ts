import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import * as whatsappService from '../services/whatsapp.service';

export const createCampaign = async (req: Request, res: Response) => {
  const { name, content } = req.body;

  try {
    // 1. Create the campaign entry
    const campaign = await prisma.campaign.create({
      data: {
        name,
        content,
        status: 'RUNNING'
      }
    });

    // 2. Fetch all leads (or filtered if implemented later)
    const leads = await prisma.lead.findMany();

    // 3. Trigger broadcast in background (non-blocking)
    // We don't await this so the user gets an immediate response
    whatsappService.sendBroadcast(leads, content, campaign.id)
      .then(async () => {
        await prisma.campaign.update({
          where: { id: campaign.id },
          data: { status: 'COMPLETED' }
        });
      })
      .catch(async (error: any) => {
        console.error('Broadcast Fail:', error);
        await prisma.campaign.update({
          where: { id: campaign.id },
          data: { status: 'FAILED' }
        });
      });

    res.json({ 
      message: 'Kampanye berhasil dimulai di latar belakang', 
      campaignId: campaign.id,
      targetCount: leads.length 
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat kampanye' });
  }
};

export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data kampanye' });
  }
};

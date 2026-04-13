import axios from 'axios';
import { prisma } from '../lib/prisma';

/**
 * Modular WhatsApp Service
 * Can be configured to use Official API or Third-party Gateways (e.g., Fonnte)
 */
export const sendMessage = async (to: string, message: string) => {
  const provider = process.env.WHATSAPP_PROVIDER || 'GATEWAY';
  
  if (provider === 'OFFICIAL') {
    // Implement Official Business API integration here
    console.log(`[WA Official]: Sending to ${to} -> ${message}`);
    return { success: true, message: 'Sent via Official API' };
  } else {
    // Implementation for Gateway like Fonnte
    const url = process.env.WA_GATEWAY_URL || 'https://api.fonnte.com/send';
    const token = process.env.WA_GATEWAY_TOKEN;

    try {
      const response = await axios.post(url, {
        target: to,
        message: message,
      }, {
        headers: { 'Authorization': token }
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('[WA Gateway Error]:', error);
      return { success: false, error: 'Failed to send via Gateway' };
    }
  }
};

/**
 * Send mass messages with a random delay (5-10s) to prevent blocking.
 * Replaces {{nama}} with the lead's name.
 */
export const sendBroadcast = async (leads: any[], template: string, campaignId: string) => {
  const MIN_DELAY = 5000; // 5 seconds
  const MAX_DELAY = 10000; // 10 seconds

  for (const lead of leads) {
    const personalizedMessage = template.replace('{{nama}}', lead.name || 'Pelanggan');
    
    // Send message via configured provider
    const result = await sendMessage(lead.phone, personalizedMessage);
    
    // Log activity in database
    await prisma.activity.create({
      data: {
        type: 'BROADCAST',
        content: personalizedMessage,
        direction: 'OUT',
        leadId: lead.id,
        campaignId: campaignId
      }
    });

    if (result.success) {
      await prisma.campaign.update({
        where: { id: campaignId },
        data: { sentCount: { increment: 1 } }
      });
    }

    // Delay before next message to follow anti-spam guidelines
    const delay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1) + MIN_DELAY);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
};

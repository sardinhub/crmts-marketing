import axios from 'axios';

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

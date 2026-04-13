import axios from 'axios';

/**
 * AI Service using Google Gemini API to handle natural language responses
 */
export const getAIResponse = async (userMessage: string) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[AI Service]: GEMINI_API_KEY not found. Using fallback.');
    return "Maaf, sistem AI sedang offline. Admin akan segera membalas.";
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: `Anda adalah asisten marketing untuk CRMTS. Balas pesan calon siswa berikut dengan ramah dan profesional: "${userMessage}"`
          }]
        }]
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('[AI Service Error]:', error);
    return "Maaf, ada kendala teknis. Mohon tunggu sebentar.";
  }
};

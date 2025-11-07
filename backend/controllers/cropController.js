import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Gemini AI with API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// Language instructions for Gemini
const languageInstructions = {
  english: "Respond in English",
  hindi: "Respond in Hindi (Devanagari script)",
  telugu: "Respond in Telugu (Telugu script)",
  tamil: "Respond in Tamil (Tamil script)",
  kannada: "Respond in Kannada (Kannada script)",
  marathi: "Respond in Marathi (Devanagari script)",
  bengali: "Respond in Bengali (Bengali script)",
  gujarati: "Respond in Gujarati (Gujarati script)",
  punjabi: "Respond in Punjabi (Gurmukhi script)",
  malayalam: "Respond in Malayalam (Malayalam script)"
};

export const getCropRecommendations = async (req, res) => {
  try {
    const {
      location,
      soilType,
      landSize,
      irrigation,
      waterAvailability,
      previousCrop,
      additionalInfo,
      language
    } = req.body;

    // Validate required fields
    if (!location || !soilType || !landSize || !irrigation || !waterAvailability) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: location, soilType, landSize, irrigation, waterAvailability'
      });
    }

    // Get language instruction
    const langInstruction = languageInstructions[language] || languageInstructions.english;

    // Create detailed prompt for Gemini
    const prompt = `
${langInstruction}. You are an expert agricultural advisor specializing in Indian farming.

Based on the following farmer's details, provide detailed crop recommendations:

📍 Location: ${location}
🌱 Soil Type: ${soilType}
📏 Land Size: ${landSize} acres
💧 Irrigation: ${irrigation}
💦 Water Availability: ${waterAvailability}
${previousCrop ? `🌾 Previous Crop: ${previousCrop}` : ''}
${additionalInfo ? `📝 Additional Information: ${additionalInfo}` : ''}

Please provide:

1. **TOP 3 RECOMMENDED CROPS** with the following details for each:
   - Crop name (with emoji)
   - Suitability percentage (0-100%)
   - Why it's suitable for this land (3-4 key reasons)
   - Water requirements (Low/Medium/High)
   - Best growing season (Kharif/Rabi/Zayad/Year-round)
   - Expected ROI per acre (in Indian Rupees)
   - Market demand (High/Medium/Low)
   - Key benefits (3-4 practical points)

2. **IMPORTANT FARMING TIPS** for this specific region and conditions

3. **CROP ROTATION ADVICE** (if previous crop was mentioned)

Format your response in a clear, well-structured way with proper headings and bullet points.
Use simple, practical language that farmers can easily understand.
Include specific advice relevant to ${location} region.
`;

    console.log('Sending request to Gemini AI...');

    // Call Gemini AI using the new API structure
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    // Extract the generated text
    const recommendations = response.text;

    console.log('Successfully received recommendations from Gemini AI');

    // Send successful response
    res.status(200).json({
      success: true,
      data: {
        recommendations,
        inputData: {
          location,
          soilType,
          landSize,
          irrigation,
          waterAvailability,
          previousCrop: previousCrop || 'Not specified',
          additionalInfo: additionalInfo || 'None',
          language: language || 'english'
        }
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in getCropRecommendations:', error);

    // Handle specific API errors
    if (error.name === 'ApiError') {
      return res.status(error.status || 500).json({
        success: false,
        message: 'Failed to get recommendations from AI',
        error: error.message,
        details: error.status === 429 
          ? 'API rate limit exceeded. Please try again later.' 
          : 'There was an error processing your request.'
      });
    }

    // Handle general errors
    res.status(500).json({
      success: false,
      message: 'Failed to get crop recommendations',
      error: error.message || 'Internal server error'
    });
  }
};

// Test function to verify API connection
export const testGeminiConnection = async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Say "Hello from Gemini AI!" in one sentence.'
    });

    res.status(200).json({
      success: true,
      message: 'Gemini AI connection successful!',
      response: response.text
    });
  } catch (error) {
    console.error('Gemini connection test failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to connect to Gemini AI',
      error: error.message
    });
  }
};

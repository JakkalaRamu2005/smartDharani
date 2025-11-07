import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// Language instructions
const languageInstructions = {
  english: "Respond in English",
  hindi: "Respond in Hindi (Devanagari script)",
  telugu: "Respond in Telugu (Telugu script)",
  tamil: "Respond in Tamil (Tamil script)",
  kannada: "Respond in Kannada (Kannada script)",
  marathi: "Respond in Marathi (Devanagari script)"
};

export const diagnoseCropIssue = async (req, res) => {
  try {
    const {
      description,
      cropType,
      symptoms,
      image,
      language
    } = req.body;

    // Validate required fields
    if (!description && !image) {
      return res.status(400).json({
        success: false,
        message: 'Please provide either an image or description'
      });
    }

    const langInstruction = languageInstructions[language] || languageInstructions.english;

    // Build content for Gemini
    const contents = [];
    const parts = [];

    // Add image if provided
    if (image) {
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: image
        }
      });
    }

    // Build prompt
    const prompt = `
${langInstruction}. You are an expert plant pathologist and agricultural advisor for Indian farming.

Diagnose the crop issue based on the following information:

Crop Type: ${cropType || 'Unknown'}
Symptoms: ${symptoms.length > 0 ? symptoms.join(', ') : 'Not specified'}
Description: ${description || 'No description provided'}

Please provide a detailed diagnosis in this exact format:

DIAGNOSIS: [Name of the disease or issue]

SUMMARY: [Brief 2-3 sentence explanation of the problem and why it's happening]

TREATMENT:
[Step 1 for treatment]
[Step 2 for treatment]
[Step 3 for treatment]
[Step 4 if applicable]

PRODUCTS: [List specific product recommendations, pesticides, fungicides, or organic solutions suitable for Indian farmers]

Please make recommendations based on:
1. Common agricultural practices in India
2. Availability of products in Indian markets
3. Cost-effective solutions for small and marginal farmers
4. Organic alternatives where possible

Important: Keep advice practical, actionable, and specific to Indian agriculture.
`;

    parts.push({
      text: prompt
    });

    contents.push({ parts });

    console.log('Sending diagnosis request to Gemini AI...');

    // Call Gemini AI
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents
    });

    const responseText = response.text;

    // Parse the structured response
    const diagnosisMatch = responseText.match(/DIAGNOSIS:\s*([^\n]+)/i);
    const summaryMatch = responseText.match(/SUMMARY:\s*([^]*?)(?=TREATMENT:|$)/i);
    const treatmentMatch = responseText.match(/TREATMENT:\s*([^]*?)(?=PRODUCTS:|$)/i);
    const productsMatch = responseText.match(/PRODUCTS:\s*([^]*?)$/i);

    const diagnosis = {
      diagnosis: diagnosisMatch ? diagnosisMatch[1].trim() : 'Unable to diagnose',
      summary: summaryMatch ? summaryMatch[1].trim() : 'No summary available',
      treatmentSteps: treatmentMatch
        ? treatmentMatch[1]
            .split('\n')
            .filter(step => step.trim().length > 0)
            .map(step => step.replace(/^\[Step \d+[\]:]?/, '').trim())
        : ['Consult with local agricultural expert'],
      productSuggestions: productsMatch
        ? productsMatch[1]
            .split('\n')
            .filter(product => product.trim().length > 0)
            .map(product => product.replace(/^[-*]\s?/, '').trim())
        : []
    };

    console.log('Successfully diagnosed crop issue');

    res.status(200).json({
      success: true,
      data: diagnosis
    });

  } catch (error) {
    console.error('Error in diagnoseCropIssue:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to diagnose crop issue',
      error: error.message
    });
  }
};

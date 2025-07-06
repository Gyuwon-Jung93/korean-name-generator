import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export default async function handler(req, res) {
  console.log('🚀 === PURE GEMINI API STARTED ===');
  console.log('📋 Request:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Please use POST request'
    });
  }

  const { englishName } = req.body;
  
  if (!englishName || !englishName.trim()) {
    return res.status(400).json({ 
      error: 'Invalid input',
      message: 'Please provide an English name'
    });
  }

  const cleanName = englishName.trim();
  console.log('📝 Clean Name:', cleanName);

  try {
    console.log('🤖 === SENDING TO GEMINI PRO ===');
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
        topP: 0.9,
      }
    });
    
    const prompt = `You are a Korean naming expert. Create a Korean name for: "${cleanName}"

RULES:
- Korean surname: 1 character (김, 이, 박, 최, 정, etc.)
- Korean given name: 2 characters  
- Consider the gender and meaning of the English name
- Use appropriate hanja (Chinese characters)
- Provide meaningful translations

RESPOND in this EXACT JSON format only:
{
  "surname": {
    "korean": "박",
    "hanja": "朴", 
    "meaning": "simple, honest"
  },
  "givenName": {
    "korean": "서연",
    "hanja": "瑞然",
    "meaning": "auspicious (瑞) + natural (然)",
    "overall_meaning": "naturally blessed"
  }
}`;

    console.log('📤 Prompt:', prompt);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    console.log('📨 Raw Gemini Response:', text);
    
    // Clean response
    let cleanText = text
      .replace(/```json\s*/g, '')
      .replace(/\s*```/g, '')
      .trim();
    
    console.log('🧹 Cleaned Response:', cleanText);
    
    const parsed = JSON.parse(cleanText);
    console.log('✅ Parsed JSON:', parsed);
    
    // Simple validation - just check if we have the basic structure
    if (!parsed.surname?.korean || !parsed.givenName?.korean) {
      throw new Error('Invalid response structure from Gemini');
    }
    
    // Parse original name for response
    const nameParts = cleanName.split(' ');
    const firstName = nameParts[0];
    const surname = nameParts.slice(1).join(' ') || '';
    
    const finalResponse = {
      success: true,
      english: {
        firstName: firstName,
        surname: surname,
        fullName: cleanName
      },
      korean: {
        surname: {
          korean: parsed.surname.korean,
          hanja: parsed.surname.hanja,
          meaning: parsed.surname.meaning
        },
        givenName: {
          korean: parsed.givenName.korean,
          hanja: parsed.givenName.hanja,
          meaning: parsed.givenName.meaning,
          overall_meaning: parsed.givenName.overall_meaning
        },
        fullName: parsed.surname.korean + parsed.givenName.korean,
        fullHanja: parsed.surname.hanja + parsed.givenName.hanja
      },
      model: 'gemini-1.5-flash',
      timestamp: new Date().toISOString(),
      cached: false
    };

    console.log('🎉 Final Response:', finalResponse);
    res.status(200).json(finalResponse);

  } catch (error) {
    console.error('❌ Gemini Error:', error);
    
    // NO FALLBACK - Just return error
    res.status(500).json({ 
      error: 'Generation failed',
      message: 'Gemini AI failed to generate Korean name. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
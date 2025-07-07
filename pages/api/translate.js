import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export default async function handler(req, res) {
    console.log('🚀 === GEMINI API WITH GENDER SUPPORT ===');
    console.log('📋 Request:', req.body);

    if (!process.env.GOOGLE_API_KEY) {
        return res.status(500).json({
            error: 'Configuration error',
            message: 'Google API key not found',
        });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed',
            message: 'Please use POST request',
        });
    }

    const { englishName, gender } = req.body;

    if (!englishName || !englishName.trim()) {
        return res.status(400).json({
            error: 'Invalid input',
            message: 'Please provide an English name',
        });
    }

    if (!gender || !['male', 'female'].includes(gender.toLowerCase())) {
        return res.status(400).json({
            error: 'Invalid input',
            message: 'Please provide a valid gender (male or female)',
        });
    }

    const cleanName = englishName.trim();
    const selectedGender = gender.toLowerCase();
    console.log('📝 Clean Name:', cleanName, 'Gender:', selectedGender);

    try {
        console.log('🤖 === SENDING TO GEMINI PRO WITH GENDER ===');

        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 300,
                topP: 0.9,
            },
        });

        // 성별에 따른 프롬프트 조정
        const genderInstructions =
            selectedGender === 'male'
                ? `
- Generate a MASCULINE Korean name suitable for boys/men
- Use strong, traditional masculine Korean given names
- Common masculine endings: -준, -서, -민, -현, -우, -진, -호, -성
- Avoid feminine endings like -연, -은, -희, -아, -나
- Focus on meanings related to strength, wisdom, leadership, honor
            `
                : `
- Generate a FEMININE Korean name suitable for girls/women  
- Use elegant, beautiful feminine Korean given names
- Common feminine endings: -연, -은, -희, -아, -나, -서, -민, -지, -영
- Avoid masculine endings like -준, -호, -성, -철, -수
- Focus on meanings related to beauty, grace, intelligence, virtue
            `;

        const prompt = `You are a Korean naming expert. Create a ${selectedGender.toUpperCase()} Korean name for: "${cleanName}"

GENDER-SPECIFIC RULES:
${genderInstructions}

GENERAL RULES:
- Korean surname: 1 character (김, 이, 박, 최, 정, etc.)
- Korean given name: 2 characters  
- Use appropriate hanja (Chinese characters)
- Provide meaningful translations
- Consider cultural appropriateness for the specified gender

RESPOND in this EXACT JSON format only:
{
  "surname": {
    "korean": "박",
    "hanja": "朴", 
    "meaning": "simple, honest"
  },
  "givenName": {
    "korean": "${selectedGender === 'male' ? '준서' : '서연'}",
    "hanja": "${selectedGender === 'male' ? '俊徐' : '瑞然'}",
    "meaning": "${selectedGender === 'male' ? 'handsome (俊) + calm (徐)' : 'auspicious (瑞) + natural (然)'}",
    "overall_meaning": "${selectedGender === 'male' ? 'handsome and calm gentleman' : 'naturally blessed and graceful'}"
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

        // Validation
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
                fullName: cleanName,
            },
            korean: {
                surname: {
                    korean: parsed.surname.korean,
                    hanja: parsed.surname.hanja,
                    meaning: parsed.surname.meaning,
                },
                givenName: {
                    korean: parsed.givenName.korean,
                    hanja: parsed.givenName.hanja,
                    meaning: parsed.givenName.meaning,
                    overall_meaning: parsed.givenName.overall_meaning,
                },
                fullName: parsed.surname.korean + parsed.givenName.korean,
                fullHanja: parsed.surname.hanja + parsed.givenName.hanja,
            },
            gender: selectedGender,
            model: 'gemini-1.5-flash',
            timestamp: new Date().toISOString(),
            cached: false,
        };

        console.log('🎉 Final Response:', finalResponse);
        res.status(200).json(finalResponse);
    } catch (error) {
        console.error('❌ Gemini Error:', error);

        // Fallback response with gender-appropriate defaults
        const fallbackGivenName =
            selectedGender === 'male'
                ? {
                      korean: '준서',
                      hanja: '俊徐',
                      meaning: 'handsome + calm',
                      overall_meaning: 'handsome and calm gentleman',
                  }
                : {
                      korean: '서연',
                      hanja: '瑞然',
                      meaning: 'auspicious + natural',
                      overall_meaning: 'naturally blessed and graceful',
                  };

        const fallbackResponse = {
            success: true,
            english: {
                firstName: cleanName.split(' ')[0],
                surname: cleanName.split(' ').slice(1).join(' ') || '',
                fullName: cleanName,
            },
            korean: {
                surname: {
                    korean: '김',
                    hanja: '金',
                    meaning: 'gold, metal',
                },
                givenName: fallbackGivenName,
                fullName: '김' + fallbackGivenName.korean,
                fullHanja: '金' + fallbackGivenName.hanja,
            },
            gender: selectedGender,
            model: 'fallback-' + selectedGender,
            timestamp: new Date().toISOString(),
            cached: false,
            fallback: true,
        };

        console.log('🛡️ Fallback Response:', fallbackResponse);
        res.status(200).json(fallbackResponse);
    }
}

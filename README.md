# 🇰🇷 Korean Name Generator

Transform English names into beautiful Korean names using AI technology.

## ✨ Features

-   **🤖 AI-Powered**: Uses Google Gemini AI to create authentic Korean names
-   **👨👩 Gender Selection**: Choose between male and female Korean names with specialized generation
-   **⚡ Real-time Translation**: Automatic translation as you type (with debouncing)
-   **🀄 Hanja & Meaning**: Shows Chinese characters and detailed meanings for each name
-   **🔊 Pronunciation Guide**: Listen to the correct pronunciation of Korean names
-   **⭐ Favorites System**: Save and manage your favorite Korean names (up to 20)
-   **💾 Smart Caching**: Instant results for previously translated names (24-hour cache)
-   **🎯 Separate Translation**: Converts English surnames and given names separately
-   **📱 Responsive Design**: Works perfectly on desktop and mobile
-   **🚀 Lightning Fast**: Optimized performance with modern web technologies

## 🎯 How It Works

1. **Select Gender**: Choose between male or female Korean names
2. **Enter Name**: Type your English first and last name
3. **AI Analysis**: AI analyzes the cultural meaning and feeling based on gender
4. **Generate**: Creates authentic Korean surname and given name
5. **Listen**: Hear the correct pronunciation of your Korean name!

### Example Translations

| English Name     | Gender | Korean Name | Hanja  | Meaning                                      |
| ---------------- | ------ | ----------- | ------ | -------------------------------------------- |
| Kelly O'driscoll | Female | 정하연      | 鄭夏然 | 정 (serious, proper) + 하연 (summer nature)  |
| Michael Johnson  | Male   | 김민준      | 金敏俊 | 김 (gold, metal) + 민준 (smart & talented)   |
| Emma Watson      | Female | 이서연      | 李瑞然 | 이 (plum tree) + 서연 (auspicious nature)    |
| David Smith      | Male   | 박준서      | 朴俊徐 | 박 (simple, honest) + 준서 (handsome & calm) |

## 🛠️ Technology Stack

### Frontend

-   **Next.js 14** - React framework for production
-   **React 18** - UI library with hooks
-   **Tailwind CSS** - Utility-first CSS framework
-   **JavaScript ES6+** - Modern JavaScript features

### Backend

-   **Next.js API Routes** - Serverless API endpoints
-   **Google Gemini AI** - Advanced AI for name generation
-   **Vercel** - Deployment and hosting platform

### Key Features

-   **Gender-Aware AI**: Specialized prompts for male/female name generation
-   **Advanced Caching**: Gender-specific cache keys for accurate results
-   **Local Storage Management** - Stores translations and favorites
-   **Error Handling** - Graceful fallbacks and user feedback
-   **Performance Optimization** - Minimal bundle size and fast loading

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn
-   Google AI Studio API key

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/korean-name-generator.git
    cd korean-name-generator
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up environment variables**

    Create a `.env.local` file in the root directory:

    ```env
    GOOGLE_API_KEY=your_google_gemini_api_key_here
    NODE_ENV=development
    ```

4. **Get Google AI API Key**

    - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
    - Sign in with your Google account
    - Create a new API key
    - Copy the key to your `.env.local` file

5. **Run the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

6. **Open your browser**

    Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
korean-name-generator/
├── components/
│   └── NameTranslator.js      # Main translation component with gender tabs
├── pages/
│   ├── api/
│   │   └── translate.js       # Gemini AI API endpoint with gender support
│   ├── index.js               # Home page
│   ├── test.js                # API testing page
│   └── _app.js                # App configuration
├── utils/
│   ├── debounce.js           # Debouncing utilities
│   └── cache.js              # Local storage cache with gender support
├── styles/
│   └── globals.css           # Global styles and animations
├── .env.local                # Environment variables
└── README.md                 # Project documentation
```

## 🎨 API Response Format

### Successful Translation

```json
{
    "success": true,
    "english": {
        "firstName": "Kelly",
        "surname": "O'driscoll",
        "fullName": "Kelly O'driscoll"
    },
    "korean": {
        "givenName": {
            "korean": "하연",
            "hanja": "夏然",
            "meaning": "summer (夏) + nature (然)",
            "overall_meaning": "bright and natural like summer"
        },
        "surname": {
            "korean": "정",
            "hanja": "鄭",
            "meaning": "serious, proper"
        },
        "fullName": "정하연",
        "fullHanja": "鄭夏然"
    },
    "gender": "female",
    "model": "gemini-1.5-flash",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "cached": false
}
```

### Error Response

```json
{
    "error": "Invalid input",
    "message": "Please provide a valid English name and gender"
}
```

## ⚡ Performance Features

### Optimization Techniques

-   **Gender-Specific Caching**: Separate cache entries for male/female names
-   **Favorites Management**: Local storage for user's favorite names
-   **Fallback System**: Provides backup names if AI fails
-   **Error Boundaries**: Graceful error handling
-   **Code Splitting**: Optimized bundle loading

### Cache Management

-   **Storage**: Browser localStorage
-   **Expiry**: 24 hours automatic cleanup
-   **Size Limit**: Maximum 100 cached translations + 20 favorites
-   **Smart Cleanup**: Removes oldest entries when limit reached
-   **Gender Awareness**: Cache keys include gender for accurate retrieval

## 🌍 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**

    ```bash
    npm install -g vercel
    ```

2. **Deploy**

    ```bash
    vercel
    ```

3. **Set Environment Variables**
    ```bash
    vercel env add GOOGLE_API_KEY
    ```

### Other Platforms

-   **Netlify**: Works with serverless functions
-   **AWS Amplify**: Full-stack deployment
-   **Railway**: Simple deployment with PostgreSQL support

## 🔧 Configuration

### Environment Variables

| Variable         | Description                          | Required |
| ---------------- | ------------------------------------ | -------- |
| `GOOGLE_API_KEY` | Google Gemini AI API key             | Yes      |
| `NODE_ENV`       | Environment (development/production) | No       |

### Customization Options

-   **Gender Prompts**: Modify gender-specific instructions in `pages/api/translate.js`
-   **Cache Duration**: Change in cache management class
-   **API Model**: Switch models in `pages/api/translate.js`
-   **UI Theme**: Customize gender-specific colors in component

## 📝 Changelog

### Version 5.0 - 7th July 2025

#### 🆕 New Features

-   **Gender Selection Tabs**: Added male/female name generation with specialized UI
-   **Gender-Aware AI**: Implemented gender-specific prompts for more accurate Korean name generation
-   **Enhanced Favorites**: Favorites now include gender information for better organization
-   **Gender-Specific Examples**: Different example names for male and female tabs
-   **Color-Coded UI**: Blue theme for male names, pink theme for female names

#### 🔧 Technical Improvements

-   **Advanced Caching**: Updated cache system with gender-specific keys
-   **API Enhancement**: Modified translate.js to handle gender parameter
-   **Fallback System**: Gender-appropriate fallback names when AI fails
-   **UI/UX Polish**: Improved visual hierarchy and user experience

#### 🌟 Features (Korean)

-   **성별 선택 탭**: 남자/여자 이름 생성을 위한 전용 탭 기능
-   **성별 맞춤 AI**: 성별에 따른 특화된 한국어 이름 생성 알고리즘
-   **향상된 즐겨찾기**: 성별 정보를 포함한 즐겨찾기 시스템
-   **성별별 예시**: 남자/여자 탭에 따른 다른 예시 이름들
-   **색상 구분 UI**: 남자는 파란색, 여자는 분홍색 테마

### Version 4.0 - 6th July 2025

#### 🆕 Major Features

-   **Favorites System**: Save up to 20 favorite Korean names with easy management
-   **Enhanced Caching**: 24-hour intelligent cache with size management
-   **Recent Translations**: Quick access to your 5 most recent name translations
-   **Speech Synthesis**: Text-to-speech pronunciation for Korean names
-   **Input Validation**: Real-time validation with character limits and English-only filtering

#### 🔧 Technical Updates

-   **Cache Class Refactor**: Complete rewrite of caching system for better performance
-   **Error Handling**: Improved error messages and fallback mechanisms
-   **Performance Optimization**: Reduced API calls and faster loading times

### Version 3.0 - 5th July 2025

#### 🆕 Core Features

-   **Name Input Separation**: Separate first name and last name input fields
-   **Generate Again**: Re-generate names with force refresh option
-   **Copy to Clipboard**: One-click copying of generated Korean names
-   **Loading States**: Beautiful loading animations and progress indicators

### Version 2.0 - 4th July 2025

#### 🆕 Foundation Features

-   **Google Gemini Integration**: Advanced AI-powered Korean name generation
-   **Hanja Display**: Chinese characters and detailed meaning explanations
-   **Responsive Design**: Mobile-first design with Tailwind CSS
-   **Basic Caching**: Initial localStorage implementation

### Version 1.2 - 4th July 2025

#### 🔧 Infrastructure

-   **Next.js 14 Upgrade**: Migration to latest Next.js with App Router
-   **API Routes**: Serverless function implementation
-   **Vercel Deployment**: Production deployment setup

### Version 1.1 - 3rd July 2025

#### 🎨 UI/UX Improvements

-   **Modern Design**: Clean, gradient-based design system
-   **Interactive Elements**: Hover effects and smooth transitions
-   **Typography**: Korean font support and improved readability

### Version 1.0 - 3rd July 2025

#### 🚀 Initial Design

-   **Basic Translation**: English to Korean name conversion
-   **Simple UI**: Basic form interface
-   **React Foundation**: Initial React component structure

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Development Guidelines

-   Use semantic commit messages
-   Add tests for new features
-   Update documentation
-   Follow existing code style
-   Consider gender inclusivity in new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

-   **Google Gemini AI** - Powering the intelligent name generation
-   **Next.js Team** - Amazing React framework
-   **Tailwind CSS** - Beautiful utility-first CSS
-   **Vercel** - Seamless deployment platform
-   **Korean Language Community** - Cultural insights and feedback

## 🚀 Future Features

-   [ ] **Name Popularity**: Show trending Korean names by generation
-   [ ]**Share Function**: Social media sharing with beautiful cards
-   [ ] **Cultural Context**: Explain historical and cultural significance
-   [ ] **Multiple Suggestions**: Provide 3-5 name options per generation
-   [ ] **Share Function**: Social media sharing with beautiful cards
-   [ ] **Name History**: Extended translation history with search
-   [ ] **Name Compatibility**: Analyze name harmony between family members

---

**Made with ❤️ for the global community** | **Powered by Google Gemini AI** | **Version 7.0 - Gender-Aware Korean Names**

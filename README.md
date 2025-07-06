# 🇰🇷 Korean Name Generator

Transform English names into beautiful Korean names using AI technology.

![Korean Name Generator Demo](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Korean+Name+Generator)

## ✨ Features

- **🤖 AI-Powered**: Uses Google Gemini AI to create authentic Korean names
- **⚡ Real-time Translation**: Automatic translation as you type (with debouncing)
- **🀄 Hanja & Meaning**: Shows Chinese characters and detailed meanings for each name
- **🔊 Pronunciation Guide**: Listen to the correct pronunciation of Korean names
- **💾 Smart Caching**: Instant results for previously translated names
- **🎯 Separate Translation**: Converts English surnames and given names separately
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **🚀 Lightning Fast**: Optimized performance with modern web technologies

## 🎯 How It Works

1. **Enter Name**: Type your English first and last name
2. **AI Analysis**: AI analyzes the cultural meaning and feeling
3. **Generate**: Creates authentic Korean surname and given name
4. **Listen**: Hear the correct pronunciation of your Korean name!

### Example Translations

| English Name | Korean Name | Hanja | Meaning |
|--------------|-------------|-------|---------|
| Kelly O'driscoll | 정하연 | 鄭夏然 | 정 (serious, proper) + 하연 (summer nature) |
| Michael Johnson | 김민준 | 金敏俊 | 김 (gold, metal) + 민준 (smart & talented) |
| Emma Watson | 이서연 | 李瑞然 | 이 (plum tree) + 서연 (auspicious nature) |
| David Smith | 박다훈 | 朴多訓 | 박 (simple, honest) + 다훈 (well-educated) |

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework for production
- **React 18** - UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript ES6+** - Modern JavaScript features

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Google Gemini AI** - Advanced AI for name generation
- **Vercel** - Deployment and hosting platform

### Key Features
- **Debouncing** - Optimizes API calls (1-second delay)
- **Local Storage Caching** - Stores translations for 24 hours
- **Error Handling** - Graceful fallbacks and user feedback
- **Performance Optimization** - Minimal bundle size and fast loading

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google AI Studio API key

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
│   └── NameTranslator.js      # Main translation component
├── pages/
│   ├── api/
│   │   └── translate.js       # Gemini AI API endpoint
│   ├── index.js               # Home page
│   ├── test.js                # API testing page
│   └── _app.js                # App configuration
├── utils/
│   ├── debounce.js           # Debouncing utilities
│   └── cache.js              # Local storage cache
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
  "model": "gemini-1.5-flash",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "cached": false
}
```

### Error Response
```json
{
  "error": "Invalid input",
  "message": "Please provide a valid English name"
}
```

## ⚡ Performance Features

### Optimization Techniques
- **Debouncing**: Prevents excessive API calls while typing
- **Caching**: Stores results locally for instant retrieval
- **Fallback System**: Provides backup names if AI fails
- **Error Boundaries**: Graceful error handling
- **Code Splitting**: Optimized bundle loading

### Cache Management
- **Storage**: Browser localStorage
- **Expiry**: 24 hours automatic cleanup
- **Size Limit**: Maximum 100 cached translations
- **Smart Cleanup**: Removes oldest entries when limit reached

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
- **Netlify**: Works with serverless functions
- **AWS Amplify**: Full-stack deployment
- **Railway**: Simple deployment with PostgreSQL support

## 🔧 Configuration

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_API_KEY` | Google Gemini AI API key | Yes |
| `NODE_ENV` | Environment (development/production) | No |

### Customization Options
- **Debounce Delay**: Modify in `utils/debounce.js`
- **Cache Duration**: Change in `utils/cache.js`
- **API Model**: Switch models in `pages/api/translate.js`
- **UI Theme**: Customize in `styles/globals.css`

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Development Guidelines
- Use semantic commit messages
- Add tests for new features
- Update documentation
- Follow existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** - Powering the intelligent name generation
- **Next.js Team** - Amazing React framework
- **Tailwind CSS** - Beautiful utility-first CSS
- **Vercel** - Seamless deployment platform
- **Korean Language Community** - Cultural insights and feedback

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/korean-name-generator/issues)
- **Email**: your.email@example.com
- **Twitter**: [@yourusername](https://twitter.com/yourusername)

## 🚀 Future Features

- [ ] **Name Meanings**: Show meaning of generated Korean names
- [ ] **Multiple Suggestions**: Provide 3-5 name options
- [ ] **Voice Input**: Speech-to-text name input
- [ ] **Share Function**: Social media sharing
- [ ] **Name History**: Extended translation history
- [ ] **Cultural Context**: Explain cultural significance
- [ ] **API Access**: Public API for developers

---

**Made with ❤️ for the global community** | **Powered by Google Gemini AI**
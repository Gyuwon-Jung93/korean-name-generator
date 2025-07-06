import { useState, useEffect } from 'react';

// Korean Name Cache
class KoreanNameCache {
  constructor() {
    this.cacheKey = 'korean_name_translations_v2';
    this.favoritesKey = 'korean_name_favorites_v1';
    this.maxSize = 100;
    this.expiryTime = 24 * 60 * 60 * 1000; // 24 hours
  }

  get(englishName) {
    if (typeof window === 'undefined') return null;

    try {
      const cache = JSON.parse(localStorage.getItem(this.cacheKey) || '{}');
      const key = this.normalizeKey(englishName);
      const item = cache[key];

      if (!item) return null;

      // Check if expired
      if (Date.now() - item.timestamp > this.expiryTime) {
        this.remove(englishName);
        return null;
      }

      return item.translation;
    } catch (error) {
      console.warn('Cache read error:', error);
      return null;
    }
  }

  set(englishName, translationResult) {
    if (typeof window === 'undefined') return;

    try {
      const cache = JSON.parse(localStorage.getItem(this.cacheKey) || '{}');
      const key = this.normalizeKey(englishName);

      // Check cache size limit
      if (Object.keys(cache).length >= this.maxSize) {
        this.clearOldest(cache);
      }

      cache[key] = {
        translation: translationResult,
        timestamp: Date.now(),
        englishName,
      };

      localStorage.setItem(this.cacheKey, JSON.stringify(cache));
    } catch (error) {
      console.warn('Cache write error:', error);
    }
  }

  // 🌟 NEW: Favorites functionality
  addToFavorites(englishName, koreanResult) {
    if (typeof window === 'undefined') return;

    try {
      const favorites = JSON.parse(localStorage.getItem(this.favoritesKey) || '[]');
      
      // Check if already exists
      const exists = favorites.some(fav => fav.english === englishName);
      if (exists) return false;

      const favoriteItem = {
        id: Date.now(),
        english: englishName,
        korean: koreanResult,
        savedAt: new Date().toISOString(),
        timestamp: Date.now()
      };

      favorites.unshift(favoriteItem); // Add to beginning
      
      // Limit to 20 favorites
      if (favorites.length > 20) {
        favorites.splice(20);
      }

      localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
      return true;
    } catch (error) {
      console.warn('Favorites add error:', error);
      return false;
    }
  }

  removeFromFavorites(englishName) {
    if (typeof window === 'undefined') return;

    try {
      const favorites = JSON.parse(localStorage.getItem(this.favoritesKey) || '[]');
      const filtered = favorites.filter(fav => fav.english !== englishName);
      localStorage.setItem(this.favoritesKey, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.warn('Favorites remove error:', error);
      return false;
    }
  }

  getFavorites() {
    if (typeof window === 'undefined') return [];

    try {
      const favorites = JSON.parse(localStorage.getItem(this.favoritesKey) || '[]');
      return favorites.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.warn('Favorites get error:', error);
      return [];
    }
  }

  isFavorite(englishName) {
    if (typeof window === 'undefined') return false;

    try {
      const favorites = JSON.parse(localStorage.getItem(this.favoritesKey) || '[]');
      return favorites.some(fav => fav.english === englishName);
    } catch (error) {
      return false;
    }
  }

  normalizeKey(englishName) {
    return englishName.toLowerCase().trim().replace(/\s+/g, '_');
  }

  clearOldest(cache) {
    const entries = Object.entries(cache);
    entries.sort(([, a], [, b]) => a.timestamp - b.timestamp);

    // Remove oldest 10 entries
    const toDelete = entries.slice(0, 10);
    toDelete.forEach(([key]) => delete cache[key]);
  }

  getAllCached() {
    if (typeof window === 'undefined') return [];

    try {
      const cache = JSON.parse(localStorage.getItem(this.cacheKey) || '{}');
      return Object.values(cache).map((item) => ({
        english: item.englishName,
        korean: item.translation?.korean?.fullName || 'N/A',
        cached: new Date(item.timestamp).toLocaleString(),
      }));
    } catch (error) {
      return [];
    }
  }
}

const nameCache = new KoreanNameCache();

const NameTranslator = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fromCache, setFromCache] = useState(false);
  const [recentTranslations, setRecentTranslations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  // Check if speech synthesis is supported
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  }, []);

  // Load recent translations and favorites on mount
  useEffect(() => {
    const cached = nameCache.getAllCached().slice(0, 5);
    setRecentTranslations(cached);
    
    const favs = nameCache.getFavorites();
    setFavorites(favs);
  }, []);

  const translateName = async (fullName) => {
    if (!fullName.trim()) {
      setResult(null);
      setError('');
      return;
    }

    // Check cache first
    const cached = nameCache.get(fullName);
    if (cached) {
      setResult(cached);
      setFromCache(true);
      setError('');
      return;
    }

    setIsLoading(true);
    setError('');
    setFromCache(false);

    try {
      const requestData = { englishName: fullName };
      console.log('🚀 API Request Data:', requestData);

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      console.log('📦 Parsed API Response:', data);

      if (data.success && data.korean) {
        const processedResult = {
          ...data,
          korean: {
            ...data.korean,
            surname: data.korean.surname?.korean ? data.korean.surname : {
              korean: data.korean.surname || '김',
              hanja: '金',
              meaning: 'gold, metal'
            },
            givenName: data.korean.givenName?.korean ? data.korean.givenName : {
              korean: data.korean.givenName || '민서',
              hanja: '敏瑞',
              meaning: 'smart + auspicious',
              overall_meaning: 'intelligent and blessed'
            },
            fullName: data.korean.fullName || (
              (data.korean.surname?.korean || data.korean.surname || '김') + 
              (data.korean.givenName?.korean || data.korean.givenName || '민서')
            ),
            fullHanja: data.korean.fullHanja || (
              (data.korean.surname?.hanja || '金') + 
              (data.korean.givenName?.hanja || '敏瑞')
            )
          }
        };

        setResult(processedResult);
        nameCache.set(fullName, processedResult);
        const updated = nameCache.getAllCached().slice(0, 5);
        setRecentTranslations(updated);
      } else {
        setError(data.message || 'Translation failed');
        setResult(null);
      }
    } catch (err) {
      console.error('🚨 Network/Fetch Error:', err);
      setError('Network error. Please check your connection.');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Manual create button handler
  const handleCreateName = () => {
    if (!firstName.trim()) {
      setError('Please enter a first name');
      return;
    }

    const fullName = lastName.trim() 
      ? `${firstName.trim()} ${lastName.trim()}`
      : firstName.trim();

    console.log('🎯 Create Button Clicked:', fullName);
    translateName(fullName);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreateName();
    }
  };

  // 🌟 NEW: Add to favorites
  const handleAddToFavorites = () => {
    if (!result) return;

    const fullName = result.english.fullName;
    const success = nameCache.addToFavorites(fullName, result.korean);
    
    if (success) {
      const updatedFavorites = nameCache.getFavorites();
      setFavorites(updatedFavorites);
      alert('✨ Added to favorites!');
    } else {
      alert('💛 Already in favorites!');
    }
  };

  // 🌟 NEW: Remove from favorites
  const handleRemoveFromFavorites = (englishName) => {
    const success = nameCache.removeFromFavorites(englishName);
    if (success) {
      const updatedFavorites = nameCache.getFavorites();
      setFavorites(updatedFavorites);
    }
  };

  // 🌟 NEW: Load favorite
  const loadFavorite = (favorite) => {
    const parts = favorite.english.split(' ');
    setFirstName(parts[0] || '');
    setLastName(parts.slice(1).join(' ') || '');
    setResult({
      success: true,
      english: {
        firstName: parts[0] || '',
        surname: parts.slice(1).join(' ') || '',
        fullName: favorite.english
      },
      korean: favorite.korean,
      model: 'cached-favorite',
      timestamp: favorite.savedAt,
      cached: true
    });
    setFromCache(true);
    setShowFavorites(false);
  };

  // Speech synthesis function
  const speakKoreanName = (koreanText, lang = 'ko-KR') => {
    if (!speechSupported) {
      alert('Speech synthesis is not supported in your browser');
      return;
    }

    window.speechSynthesis.cancel();
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(koreanText);
    utterance.lang = lang;
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const koreanVoice = voices.find(voice => 
      voice.lang.startsWith('ko') || 
      voice.name.includes('Korean') ||
      voice.name.includes('한국')
    );
    
    if (koreanVoice) {
      utterance.voice = koreanVoice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      console.warn('Speech synthesis error');
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const clearInput = () => {
    setFirstName('');
    setLastName('');
    setResult(null);
    setError('');
    setFromCache(false);
  };

  const loadExample = (exampleName) => {
    const parts = exampleName.split(' ');
    setFirstName(parts[0] || '');
    setLastName(parts.slice(1).join(' ') || '');
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('📋 Copied to clipboard!');
    } catch (err) {
      console.warn('Failed to copy to clipboard');
    }
  };

  // Safe data extraction functions
  const getSurname = (result) => {
    if (result?.korean?.surname?.korean) return result.korean.surname.korean;
    if (result?.korean?.surname) return result.korean.surname;
    return '김';
  };

  const getSurnameHanja = (result) => {
    if (result?.korean?.surname?.hanja) return result.korean.surname.hanja;
    return '金';
  };

  const getSurnameMeaning = (result) => {
    if (result?.korean?.surname?.meaning) return result.korean.surname.meaning;
    return 'gold, metal';
  };

  const getGivenName = (result) => {
    if (result?.korean?.givenName?.korean) return result.korean.givenName.korean;
    if (result?.korean?.givenName) return result.korean.givenName;
    return '민서';
  };

  const getGivenNameHanja = (result) => {
    if (result?.korean?.givenName?.hanja) return result.korean.givenName.hanja;
    return '敏瑞';
  };

  const getGivenNameMeaning = (result) => {
    if (result?.korean?.givenName?.meaning) return result.korean.givenName.meaning;
    return 'smart + auspicious';
  };

  const getFullName = (result) => {
    if (result?.korean?.fullName) return result.korean.fullName;
    return getSurname(result) + getGivenName(result);
  };

  const getFullHanja = (result) => {
    if (result?.korean?.fullHanja) return result.korean.fullHanja;
    return getSurnameHanja(result) + getGivenNameHanja(result);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Korean Name Generator
        </h1>
        <p className="text-gray-600">
          Transform English names into beautiful Korean names using AI
        </p>
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* First Name Input */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., Kelly, Michael"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              maxLength={50}
            />
          </div>

          {/* Last Name Input */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., O'driscoll, Johnson"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              maxLength={50}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCreateName}
            disabled={!firstName.trim() || isLoading}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              '✨ Create Korean Name'
            )}
          </button>
          
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="bg-yellow-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-yellow-600 transition-all duration-200"
          >
            ⭐ Favorites ({favorites.length})
          </button>
          
          <button
            onClick={clearInput}
            className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200"
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      {/* 🌟 NEW: Favorites Panel */}
      {showFavorites && (
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="text-sm font-semibold text-yellow-800 mb-3">⭐ Your Favorite Korean Names</h3>
          {favorites.length > 0 ? (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {favorites.map((favorite, index) => (
                <div key={favorite.id} className="flex items-center justify-between p-2 bg-white rounded border hover:bg-yellow-50 transition-colors">
                  <button
                    onClick={() => loadFavorite(favorite)}
                    className="flex-1 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">{favorite.english}</span>
                      <span className="text-sm text-yellow-600">→</span>
                      <span className="text-sm font-medium text-yellow-800 korean-text">{favorite.korean.fullName}</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleRemoveFromFavorites(favorite.english)}
                    className="text-red-500 hover:text-red-700 text-xs ml-2"
                    title="Remove from favorites"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-yellow-600">No favorites yet. Generate a name and click the star to save it!</p>
          )}
        </div>
      )}

      {/* Quick Examples */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-sm font-semibold text-blue-800 mb-3">💡 Try these examples:</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            "Kelly O'driscoll",
            "Michael Johnson", 
            "Emma Watson",
            "David Smith"
          ].map((example, index) => (
            <button
              key={index}
              onClick={() => loadExample(example)}
              className="text-left p-2 text-sm text-blue-700 hover:bg-blue-100 rounded transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Translations */}
      {recentTranslations.length > 0 && !firstName && !lastName && !showFavorites && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">📚 Recent Translations:</h3>
          <div className="space-y-2">
            {recentTranslations.map((item, index) => (
              <button
                key={index}
                onClick={() => loadExample(item.english)}
                className="w-full text-left p-2 text-sm hover:bg-gray-100 rounded transition-colors flex justify-between"
              >
                <span>{item.english}</span>
                <span className="korean-text text-gray-600">{item.korean}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8 fade-in">
          <div className="loading-dots mx-auto mb-3"></div>
          <p className="text-gray-600">Generating Korean name...</p>
          <p className="text-sm text-gray-500 mt-1">Powered by Google Gemini AI</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 fade-in">
          <div className="flex items-center">
            <span className="text-red-500 mr-2">⚠️</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Result Section */}
      {result && !isLoading && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-800">
              Generated Korean Name
            </h3>
            <div className="flex items-center gap-2">
              {fromCache && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  ⚡ Cached
                </span>
              )}
              {/* 🌟 NEW: Add to Favorites Button */}
              <button
                onClick={handleAddToFavorites}
                className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full hover:bg-yellow-200 transition-colors"
                title="Add to favorites"
              >
                ⭐ Save
              </button>
              <button
                onClick={() => copyToClipboard(getFullName(result))}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
              >
                📋 Copy
              </button>
            </div>
          </div>

          {/* Name Breakdown */}
          <div className="space-y-4">
            {/* English Name */}
            <div className="bg-white p-3 rounded-md border">
              <div className="text-sm text-gray-600 mb-1">English Name</div>
              <div className="font-medium">
                <span className="text-blue-600">{result.english.firstName}</span>
                {result.english.surname && (
                  <>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-green-600">{result.english.surname}</span>
                  </>
                )}
              </div>
            </div>

            {/* Korean Name */}
            <div className="bg-white p-4 rounded-md border">
              <div className="text-sm text-gray-600 mb-2">Korean Name</div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="korean-text text-2xl font-bold mb-1">
                    <span className="text-green-600">{getSurname(result)}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-blue-600">{getGivenName(result)}</span>
                  </div>
                  <div className="korean-text text-lg text-gray-700">
                    {getFullName(result)}
                  </div>
                </div>
                
                {/* Speech Button */}
                {speechSupported && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => speakKoreanName(getFullName(result))}
                      disabled={isSpeaking}
                      className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors disabled:opacity-50"
                      title="Listen to pronunciation"
                    >
                      {isSpeaking ? (
                        <span className="text-sm animate-pulse">🔊</span>
                      ) : (
                        <span className="text-sm">🔊</span>
                      )}
                    </button>
                    {isSpeaking && (
                      <button
                        onClick={stopSpeaking}
                        className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                        title="Stop pronunciation"
                      >
                        <span className="text-sm">⏹️</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Hanja and Meaning */}
              <div className="border-t pt-3 space-y-3">
                {/* Full Hanja */}
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-xs text-gray-500 mb-1">Chinese Characters (Hanja)</div>
                  <div className="text-xl font-bold text-gray-800 mb-2">
                    <span className="text-green-700">{getSurnameHanja(result)}</span>
                    <span className="text-blue-700">{getGivenNameHanja(result)}</span>
                    <span className="text-sm text-gray-600 ml-2">
                      ({getFullHanja(result)})
                    </span>
                  </div>
                </div>

                {/* Meaning Breakdown */}
                <div className="grid grid-cols-1 gap-3">
                  {/* Surname Meaning */}
                  <div className="bg-green-50 p-3 rounded-md">
                    <div className="text-xs font-medium text-green-800 mb-1">Surname</div>
                    <div className="text-sm">
                      <span className="font-semibold text-green-700">
                        {getSurname(result)} ({getSurnameHanja(result)})
                      </span>
                      <div className="text-green-600 mt-1">
                        {getSurnameMeaning(result)}
                      </div>
                    </div>
                  </div>

                  {/* Given Name Meaning */}
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="text-xs font-medium text-blue-800 mb-1">Given Name</div>
                    <div className="text-sm">
                      <span className="font-semibold text-blue-700">
                        {getGivenName(result)} ({getGivenNameHanja(result)})
                      </span>
                      <div className="text-blue-600 mt-1">
                        {getGivenNameMeaning(result)}
                      </div>
                      {result.korean?.givenName?.overall_meaning && (
                        <div className="text-blue-500 text-xs mt-1 italic">
                          Overall: {result.korean.givenName.overall_meaning}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Translation Details */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-blue-100 p-2 rounded">
                <div className="text-blue-800 font-medium">Given Name</div>
                <div className="text-blue-600">
                  {result.english.firstName} → {getGivenName(result)}
                </div>
              </div>
              <div className="bg-green-100 p-2 rounded">
                <div className="text-green-800 font-medium">Surname</div>
                <div className="text-green-600">
                  {result.english.surname || 'None'} → {getSurname(result)}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleCreateName}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                🔄 Generate Again
              </button>
              <button
                onClick={clearInput}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                🗑️ Clear
              </button>
              {speechSupported && result && (
                <button
                  onClick={() => speakKoreanName(getFullName(result))}
                  disabled={isSpeaking}
                  className="bg-green-100 text-green-700 py-2 px-4 rounded-md hover:bg-green-200 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  {isSpeaking ? '🔊 Playing...' : '🔊 Listen'}
                </button>
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-4 pt-3 border-t border-blue-200 flex items-center justify-between text-xs text-gray-500">
            <span>Model: {result.model}</span>
            <span>{new Date(result.timestamp).toLocaleTimeString()}</span>
          </div>

          {/* 🌟 NEW: Buy Me a Coffee Section */}
          <div className="mt-6 pt-4 border-t border-blue-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">
                💝 Enjoyed using this Korean Name Generator?
              </p>
              <div className="flex justify-center mb-3">
                <a 
                  href="https://www.buymeacoffee.com/gyuwonJung" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block transform hover:scale-105 transition-transform duration-200"
                >
                  <img 
                    src="https://img.buymeacoffee.com/button-api/?text=Buy Q1 a coffee&emoji=☕&slug=gyuwonJung&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" 
                    alt="Buy Me A Coffee"
                    className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                  />
                </a>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                ✨ Support the development of more awesome tools!
              </p>
              {/* 🔗 NEW: LinkedIn Link */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <span>Created by</span>
                <a 
                  href="https://www.linkedin.com/in/gyuwonjung/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors underline"
                >
                  Gyuwon Jung
                </a>
                <span>•</span>
                <span>💼 Connect on LinkedIn</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!firstName && !lastName && !result && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-3">🇰🇷</div>
          <p className="text-lg">Enter your English name to get started</p>
          <p className="text-sm mt-2">
            Our AI will create a beautiful Korean name that captures the essence of your English name
          </p>
          {speechSupported && (
            <p className="text-xs mt-2 text-blue-600">
              🔊 Voice pronunciation available
            </p>
          )}
          <p className="text-xs mt-2 text-gray-500">
            💡 Press Enter in any field or click Create button to generate your Korean name
          </p>
        </div>
      )}
    </div>
  );
};

export default NameTranslator;
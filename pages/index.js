import Head from 'next/head';
import NameTranslator from '../components/NameTranslator';
import PerformanceMonitor from '../components/PerformanceMonitor';
import Script from 'next/script';
export default function Home() {
    return (
        <>
            <Head>
                <title>WhatsYourKoreanName?</title>
                <meta
                    name="description"
                    content="Transform English names into beautiful Korean names using AI. Generate authentic Korean names that capture the essence of your English name."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    name="keywords"
                    content="Korean name generator, English to Korean names, AI name translator, Korean names"
                />
                <meta name="google-adsense-account" content="ca-pub-3827871880528575"></meta>
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Korean Name Generator" />
                <meta
                    property="og:description"
                    content="Transform English names into beautiful Korean names using AI"
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://korean-name-generator.vercel.app" />

                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Korean Name Generator" />
                <meta
                    name="twitter:description"
                    content="Transform English names into beautiful Korean names using AI"
                />
                <meta name="google-site-verification" content="tu4OYYsEbNDmAigHKkMV7-M_6hN7CyMD9ylX4stHhsU" />
                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />

                {/* Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            </Head>
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3827871880528575"
                crossOrigin="anonymous"
                strategy="afterInteractive"
            />

            <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20zM40 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                </div>

                {/* Header */}
                <header className="relative z-10 pt-8 pb-4">
                    <div className="container mx-auto px-4 text-center">
                        <div className="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-md mb-4">
                            <span className="text-2xl mr-2">🇰🇷</span>
                            <span className="text-2xl">✨</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Whats Your Korean Name?</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover your Korean identity! Transform any English name into a beautiful, meaningful
                            Korean name using advanced AI technology✨
                        </p>
                    </div>
                </header>

                <section className="relative z-10 py-12 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
                    <div className="container mx-auto px-4 text-center">
                        <div
                            className="relative max-w-4xl mx-auto p-8 rounded-lg"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23667eea' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569-13.431-30-30-30v30h30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                🇰🇷 Bridging Cultures Through Names ✨
                            </h2>
                            <p className="text-lg text-gray-600">
                                Discover the beautiful art of Korean naming traditions
                            </p>
                        </div>
                    </div>
                </section>
                {/* How It Works */}
                <section className="relative z-10 py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">How It Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-blue-600 font-bold">1</span>
                                </div>
                                <h3 className="font-medium text-gray-800 mb-1">Enter Name</h3>
                                <p className="text-gray-600 text-sm">Type your English first and last name</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-green-600 font-bold">2</span>
                                </div>
                                <h3 className="font-medium text-gray-800 mb-1">AI Analysis</h3>
                                <p className="text-gray-600 text-sm">AI analyzes meaning and cultural context</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-purple-600 font-bold">3</span>
                                </div>
                                <h3 className="font-medium text-gray-800 mb-1">Generate</h3>
                                <p className="text-gray-600 text-sm">Creates authentic Korean surname and given name</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-red-600 font-bold">4</span>
                                </div>
                                <h3 className="font-medium text-gray-800 mb-1">Enjoy</h3>
                                <p className="text-gray-600 text-sm">Discover your beautiful Korean name!</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Main Content */}
                <div className="relative z-10 container mx-auto px-4 py-8">
                    <NameTranslator />
                </div>

                {/* Features Section */}
                <section className="relative z-10 py-12 bg-white/50 backdrop-blur-sm">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Why Choose Our Generator?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <div className="text-center p-6">
                                <div className="text-3xl mb-3">🤖</div>
                                <h3 className="font-semibold text-gray-800 mb-2">AI-Powered</h3>
                                <p className="text-gray-600 text-sm">
                                    Uses Google Gemini AI to create authentic Korean names that capture the essence and
                                    meaning of your English name.
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-3xl mb-3">🀄</div>
                                <h3 className="font-semibold text-gray-800 mb-2">Hanja & Meaning</h3>
                                <p className="text-gray-600 text-sm">
                                    Discover the beautiful Chinese characters (hanja) and deep meanings behind your
                                    Korean name.
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-3xl mb-3">🔊</div>
                                <h3 className="font-semibold text-gray-800 mb-2">Hear Pronunciation</h3>
                                <p className="text-gray-600 text-sm">
                                    Listen to the correct pronunciation of your Korean name with built-in text-to-speech
                                    technology.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-10 bg-gray-800 text-white py-8 mt-12">
                    <div className="container mx-auto px-4 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <span className="text-2xl mr-2">🇰🇷</span>
                            <span className="text-xl font-semibold">Korean Name Generator</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Transform English names into beautiful Korean names using AI
                        </p>
                        <div className="flex justify-center items-center space-x-6 text-sm text-gray-400 flex-wrap">
                            <span>Made with ❤️ for the global community</span>
                            <span className="hidden sm:block">•</span>
                            <span className="flex items-center space-x-2">
                                <span>Powered by</span>
                                {/* Gemini 로고 SVG */}
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="inline-block"
                                >
                                    <defs>
                                        <linearGradient id="geminiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: '#4285F4' }} />
                                            <stop offset="25%" style={{ stopColor: '#9C27B0' }} />
                                            <stop offset="50%" style={{ stopColor: '#FF5722' }} />
                                            <stop offset="75%" style={{ stopColor: '#FFC107' }} />
                                            <stop offset="100%" style={{ stopColor: '#4CAF50' }} />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                                        fill="url(#geminiGradient)"
                                    />
                                    <path
                                        d="M12 8L12.5 10.5L15 11L12.5 11.5L12 14L11.5 11.5L9 11L11.5 10.5L12 8Z"
                                        fill="url(#geminiGradient)"
                                        opacity="0.7"
                                    />
                                </svg>
                                <span className="text-blue-300">Google Gemini AI</span>
                            </span>
                            <span className="hidden sm:block">•</span>
                            <span>© 2025</span>
                        </div>
                    </div>
                </footer>

                {/* Performance Monitor - Only in development */}
                {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
            </main>
        </>
    );
}

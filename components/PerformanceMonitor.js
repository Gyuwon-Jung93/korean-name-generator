import { useState, useEffect } from 'react';
import nameCache from '../utils/cache';

const PerformanceMonitor = () => {
    const [stats, setStats] = useState({
        cacheStats: { count: 0, size: 0 },
        apiCalls: 0,
        cacheHits: 0,
        averageResponseTime: 0,
    });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Update stats every 5 seconds
        const interval = setInterval(() => {
            const cacheStats = nameCache.getStats();
            setStats((prev) => ({
                ...prev,
                cacheStats,
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Toggle visibility with keyboard shortcut
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'P') {
                setIsVisible((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    if (!isVisible) {
        return (
            <div className="fixed bottom-4 right-4 z-50">
                <button
                    onClick={() => setIsVisible(true)}
                    className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
                    title="Show Performance Stats (Ctrl+Shift+P)"
                >
                    📊
                </button>
            </div>
        );
    }

    const cacheHitRate =
        stats.apiCalls > 0 ? ((stats.cacheHits / (stats.apiCalls + stats.cacheHits)) * 100).toFixed(1) : 0;

    return (
        <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-64">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Performance Stats</h3>
                <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-gray-700">
                    ✕
                </button>
            </div>

            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">Cache Entries:</span>
                    <span className="font-medium">{stats.cacheStats.count}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Cache Size:</span>
                    <span className="font-medium">{(stats.cacheStats.size / 1024).toFixed(1)} KB</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">API Calls:</span>
                    <span className="font-medium">{stats.apiCalls}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Cache Hits:</span>
                    <span className="font-medium text-green-600">{stats.cacheHits}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Hit Rate:</span>
                    <span className="font-medium text-blue-600">{cacheHitRate}%</span>
                </div>

                <div className="pt-2 border-t">
                    <button
                        onClick={() => {
                            nameCache.clear();
                            setStats((prev) => ({
                                ...prev,
                                cacheStats: { count: 0, size: 0 },
                            }));
                        }}
                        className="w-full text-xs bg-red-100 text-red-700 py-1 px-2 rounded hover:bg-red-200 transition-colors"
                    >
                        Clear Cache
                    </button>
                </div>
            </div>

            <div className="mt-2 text-xs text-gray-500">Press Ctrl+Shift+P to toggle</div>
        </div>
    );
};

export default PerformanceMonitor;

/**
 * Korean Name Cache - Updated for new API format
 */
class KoreanNameCache {
    constructor() {
      this.cacheKey = 'korean_name_translations_v2';
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
          englishName
        };
        
        localStorage.setItem(this.cacheKey, JSON.stringify(cache));
      } catch (error) {
        console.warn('Cache write error:', error);
      }
    }
  
    remove(englishName) {
      if (typeof window === 'undefined') return;
      
      try {
        const cache = JSON.parse(localStorage.getItem(this.cacheKey) || '{}');
        const key = this.normalizeKey(englishName);
        delete cache[key];
        localStorage.setItem(this.cacheKey, JSON.stringify(cache));
      } catch (error) {
        console.warn('Cache remove error:', error);
      }
    }
  
    clear() {
      if (typeof window === 'undefined') return;
      
      try {
        localStorage.removeItem(this.cacheKey);
      } catch (error) {
        console.warn('Cache clear error:', error);
      }
    }
  
    getStats() {
      if (typeof window === 'undefined') return { count: 0, size: 0 };
      
      try {
        const cache = JSON.parse(localStorage.getItem(this.cacheKey) || '{}');
        return {
          count: Object.keys(cache).length,
          size: new Blob([JSON.stringify(cache)]).size,
          maxSize: this.maxSize
        };
      } catch (error) {
        return { count: 0, size: 0, maxSize: this.maxSize };
      }
    }
  
    normalizeKey(englishName) {
      return englishName.toLowerCase().trim().replace(/\s+/g, '_');
    }
  
    clearOldest(cache) {
      const entries = Object.entries(cache);
      entries.sort(([,a], [,b]) => a.timestamp - b.timestamp);
      
      // Remove oldest 10 entries
      const toDelete = entries.slice(0, 10);
      toDelete.forEach(([key]) => delete cache[key]);
    }
  
    getAllCached() {
      if (typeof window === 'undefined') return [];
      
      try {
        const cache = JSON.parse(localStorage.getItem(this.cacheKey) || '{}');
        return Object.values(cache).map(item => ({
          english: item.englishName,
          korean: item.translation?.korean?.fullName || 'N/A',
          cached: new Date(item.timestamp).toLocaleString()
        }));
      } catch (error) {
        return [];
      }
    }
  }
  
  export default new KoreanNameCache();
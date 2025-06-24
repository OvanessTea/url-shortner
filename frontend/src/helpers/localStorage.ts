import { Url } from '../types/url.type';

const CACHE_KEY = 'shortened_urls_cache';
const MAX_CACHE_SIZE = 50;

export interface CachedUrl extends Url {
  cachedAt: number;
}

export const localStorageHelper = {
  saveUrl: (url: Url): void => {
    try {
      const cachedUrls = localStorageHelper.getUrls();
      
      const existingIndex = cachedUrls.findIndex(cached => cached.shortUrl === url.shortUrl);
      
      if (existingIndex !== -1) {
        cachedUrls[existingIndex] = { ...url, cachedAt: Date.now() };
      } else {
        cachedUrls.unshift({ ...url, cachedAt: Date.now() });
      }
      
      if (cachedUrls.length > MAX_CACHE_SIZE) {
        cachedUrls.splice(MAX_CACHE_SIZE);
      }
      
      localStorage.setItem(CACHE_KEY, JSON.stringify(cachedUrls));
    } catch (error) {
      console.error('Failed to save URL to localStorage:', error);
    }
  },

  getUrls: (): CachedUrl[] => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : [];
    } catch (error) {
      console.error('Failed to get URLs from localStorage:', error);
      return [];
    }
  },

  removeUrl: (shortUrl: string): void => {
    try {
      const cachedUrls = localStorageHelper.getUrls();
      const filteredUrls = cachedUrls.filter(url => url.shortUrl !== shortUrl);
      localStorage.setItem(CACHE_KEY, JSON.stringify(filteredUrls));
    } catch (error) {
      console.error('Failed to remove URL from localStorage:', error);
    }
  },
}; 
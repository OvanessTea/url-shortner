import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UrlForm } from './components/form/UrlForm';
import { UrlInfoSearch } from './components/info/UrlInfoSearch';
import { Url } from './types/url.type';
import UrlList from './components/list/UrlList';
import { localStorageHelper } from './helpers/localStorage';
import './global.scss';

export default function App() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [urls, setUrls] = useState<Url[]>([]);

  useEffect(() => {
    const cachedUrls = localStorageHelper.getUrls();
    const urlsFromCache: Url[] = cachedUrls.map(({ cachedAt, ...url }) => url);
    setUrls(urlsFromCache);
  }, []);

  const addUrl = (newUrl: Url) => {
    setUrls(prevUrls => [...prevUrls, newUrl]);
    localStorageHelper.saveUrl(newUrl);
  };

  const removeUrl = (shortUrl: string) => {
    setUrls(prevUrls => prevUrls.filter(url => url.shortUrl !== shortUrl));
    localStorageHelper.removeUrl(shortUrl);
  };

  return (
    <div>
      <h1>URL Shortener</h1>

      <AnimatePresence>
        {error && (
          <motion.div 
            className="error" 
            onClick={() => setError('')} 
            style={{ cursor: 'pointer' }}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {success && (
          <motion.div 
            className="success" 
            onClick={() => setSuccess('')} 
            style={{ cursor: 'pointer' }}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {success}
          </motion.div>
        )}
      </AnimatePresence>

      <UrlInfoSearch 
        setError={setError} 
        setSuccess={setSuccess} 
      />

      <UrlForm 
        setError={setError} 
        setSuccess={setSuccess} 
        urls={urls} 
        setUrls={addUrl} 
      />
      
      {urls.length > 0 && (
        <UrlList 
          urls={urls} 
          setError={setError} 
          setSuccess={setSuccess} 
          onUrlRemove={removeUrl}
        />
        )}

    </div>
  );
}
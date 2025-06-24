import React, { useState } from 'react';
import { getUrlInfo } from '../../lib/info';
import { Url } from '../../types/url.type';
import { UrlInfoCard } from './UrlInfoCard';
import { localStorageHelper } from '../../helpers/localStorage';
import styles from './UrlInfoSearch.module.scss';

interface UrlInfoSearchProps {
    setError: (error: string) => void;
    setSuccess: (success: string) => void;
}

export const UrlInfoSearch: React.FC<UrlInfoSearchProps> = ({ setError, setSuccess }) => {
    const [shortUrl, setShortUrl] = useState('');
    const [urlInfo, setUrlInfo] = useState<Url | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showInfoCard, setShowInfoCard] = useState(false);
    const [source, setSource] = useState<'cache' | 'api' | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!shortUrl.trim()) {
            setError('Please enter a short URL');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const cleanShortUrl = shortUrl.includes('/')
                ? shortUrl.split('/').pop() || shortUrl
                : shortUrl;


            const info = await getUrlInfo(cleanShortUrl);
            setUrlInfo(info);
            setSource('api');
            setSuccess('URL information retrieved from server!');

            setShowInfoCard(true);
        } catch (error: any) {
            setError(error.message || 'Failed to get URL information');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseInfoCard = () => {
        setShowInfoCard(false);
        setUrlInfo(null);
        setSource(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2>🔍 Find URL Information</h2>
                <p className={styles.description}>
                    Enter a short URL to get detailed information about it
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.input_group}>
                        <input
                            type="text"
                            value={shortUrl}
                            onChange={(e) => setShortUrl(e.target.value)}
                            placeholder="Enter short URL (e.g., abc123 or https://example.com/abc123)"
                            className={styles.input}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className={styles.submit_btn}
                            disabled={isLoading || !shortUrl.trim()}
                        >
                            {isLoading ? '🔍 Searching...' : '🔍 Search'}
                        </button>
                    </div>
                </form>

                <div className={styles.example}>
                    <h4>Examples:</h4>
                    <ul>
                        <li>Just the short code: <code>abc123</code></li>
                        <li>Full short URL: <code>https://example.com/abc123</code></li>
                    </ul>
                </div>
            </div>

            {showInfoCard && urlInfo && (
                <UrlInfoCard
                    url={urlInfo}
                    setSuccess={setSuccess}
                    onClose={handleCloseInfoCard}
                    source={source}
                />
            )}
        </div>
    );
}; 
import { useState } from "react";
import { copyToClipboard } from "../../helpers/copyToClipboard";
import { getAnalytics } from "../../lib/analytics";
import { Analytics } from "../../types/analytics.type";
import { Url } from "../../types/url.type";
import { deleteShortUrl } from "../../lib/shorten";
import { getFullShortUrl } from "../../helpers/getFullShortUrl";
import styles from './UrlList.module.scss';
import { AnalyticsCard } from "../analytics/AnalyticsCard";
import { UrlInfoCard } from "../info/UrlInfoCard";
import { getUrlInfo } from "../../lib/info";

interface AppProps {
    setError: (error: string) => void;
    setSuccess: (success: string) => void;
    urls: Url[];
    onUrlRemove?: (shortUrl: string) => void;
}

const UrlList = ({ urls, setError, setSuccess, onUrlRemove }: AppProps) => {
    const [analytics, setAnalytics] = useState<{ [key: string]: Analytics }>({});
    const [selectedUrl, setSelectedUrl] = useState<Url | null>(null);
    const [showInfoCard, setShowInfoCard] = useState(false);
    const [selectedAnalyticsUrl, setSelectedAnalyticsUrl] = useState<string | null>(null);

    const getAnalyticsData = async (shortUrl: string) => {
        try {
            const data = await getAnalytics(shortUrl);
            setAnalytics(prev => ({
                ...prev,
                [shortUrl]: data
              }));
        } catch (error: any) {
            setError(error.response?.data?.message || 'Failed to get analytics');
        }
    }

    const handleViewDetails = async (url: Url) => {
        const info = await getUrlInfo(url.shortUrl);
        setSelectedUrl(info);
        setShowInfoCard(true);
    };

    const handleViewAnalytics = (shortUrl: string) => {
        if (selectedAnalyticsUrl === shortUrl) {
            setSelectedAnalyticsUrl(null);
        } else {
            setSelectedAnalyticsUrl(shortUrl);
            getAnalyticsData(shortUrl);
        }
    };

    const handleCloseInfoCard = () => {
        setShowInfoCard(false);
        setSelectedUrl(null);
    };

    const handleDeleteUrl = async (shortUrl: string) => {
        try {
            await deleteShortUrl(shortUrl);
            setSuccess('URL deleted successfully');
            if (onUrlRemove) {
                onUrlRemove(shortUrl);
            }
            setAnalytics(prev => {
                const newAnalytics = { ...prev };
                delete newAnalytics[shortUrl];
                return newAnalytics;
            });
            if (selectedAnalyticsUrl === shortUrl) {
                setSelectedAnalyticsUrl(null);
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Failed to delete URL');
        }
    };

    return (
        <div className={styles.card}>
            <h2>Your Short URLs</h2>
            <ul className={styles.url_list}>
                {urls.map((url) => (
                    <li key={url.shortUrl} className={styles.url_item}>
                        <h3>Short URL: {getFullShortUrl(url.shortUrl)}</h3>
                        <p><strong>Original:</strong> {url.originalUrl}</p>
                        {url.expiresAt && (
                            <p><strong>Expires:</strong> {new Date(url.expiresAt).toLocaleString()}</p>
                        )}

                        <div className={styles.url_actions}>
                            <button
                                className={`${styles.btn} ${styles.btn_copy}`}
                                onClick={() => copyToClipboard(url.shortUrl, setSuccess)}
                            >
                                Copy URL
                            </button>
                            <button
                                className={`${styles.btn} ${styles.btn_info}`}
                                onClick={() => handleViewDetails(url)}
                            >
                                Details
                            </button>
                            <button
                                className={`${styles.btn} ${styles.btn_secondary}`}
                                onClick={() => handleViewAnalytics(url.shortUrl)}
                            >
                                {selectedAnalyticsUrl === url.shortUrl ? 'Hide Analytics' : 'View Analytics'}
                            </button>
                            <button
                                className={`${styles.btn} ${styles.btn_danger}`}
                                onClick={() => handleDeleteUrl(url.shortUrl)}
                            >
                                Delete
                            </button>
                        </div>

                        {selectedAnalyticsUrl === url.shortUrl && analytics[url.shortUrl] && (
                            <AnalyticsCard data={analytics[url.shortUrl]} />
                        )}
                    </li>
                ))}
            </ul>

            {showInfoCard && selectedUrl && (
                <UrlInfoCard
                    url={selectedUrl}
                    setSuccess={setSuccess}
                    onClose={handleCloseInfoCard}
                />
            )}
        </div>
    )
}

export default UrlList;
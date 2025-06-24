import React from 'react';
import { Url } from '../../types/url.type';
import { getFullShortUrl } from '../../helpers/getFullShortUrl';
import { copyToClipboard } from '../../helpers/copyToClipboard';
import styles from './UrlInfoCard.module.scss';

interface UrlInfoCardProps {
    url: Url;
    setSuccess: (message: string) => void;
    onClose: () => void;
    source?: 'cache' | 'api' | null;
}

export const UrlInfoCard: React.FC<UrlInfoCardProps> = ({ url, setSuccess, onClose, source }) => {
    const handleCopyUrl = () => {
        copyToClipboard(url.shortUrl, setSuccess);
    };

    const handleCopyOriginal = () => {
        copyToClipboard(url.originalUrl, setSuccess);
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.card} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>URL Information</h2>
                    <button className={styles.closeBtn} onClick={onClose}>
                        ×
                    </button>
                </div>

                {source && (
                    <div className={styles.sourceIndicator}>
                        <span className={`${styles.source} ${styles[source]}`}>
                            {source === 'cache' ? '📦 From Cache' : '🌐 From Server'}
                        </span>
                    </div>
                )}

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h3>Short URL</h3>
                        <div className={styles.urlDisplay}>
                            <span className={styles.url}>{getFullShortUrl(url.shortUrl)}</span>
                            <button 
                                className={styles.copyBtn}
                                onClick={handleCopyUrl}
                                title="Copy short URL"
                            >
                                📋
                            </button>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h3>Original URL</h3>
                        <div className={styles.urlDisplay}>
                            <span className={styles.url}>{url.originalUrl}</span>
                            <button 
                                className={styles.copyBtn}
                                onClick={handleCopyOriginal}
                                title="Copy original URL"
                            >
                                📋
                            </button>
                        </div>
                    </div>

                    {url.alias && (
                        <div className={styles.section}>
                            <h3>Custom Alias</h3>
                            <p className={styles.alias}>{url.alias}</p>
                        </div>
                    )}

                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={styles.label}>Created:</span>
                            <span className={styles.value}>
                                {new Date(url.createdAt).toLocaleString()}
                            </span>
                        </div>

                        <div className={styles.stat}>
                            <span className={styles.label}>Total Clicks:</span>
                            <span className={styles.value}>{url.clickCount}</span>
                        </div>

                        {url.expiresAt && (
                            <div className={styles.stat}>
                                <span className={styles.label}>Expires:</span>
                                <span className={styles.value}>
                                    {new Date(url.expiresAt).toLocaleString()}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.footer}>
                    <button className={styles.btn} onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}; 
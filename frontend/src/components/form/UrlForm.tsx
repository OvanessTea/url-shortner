import { useState } from "react";
import { Url } from "../../types/url.type";
import { createShortUrl } from "../../lib/shorten";
import styles from './UrlForm.module.scss';

interface UrlFormProps {
  setError: (error: string) => void;
  setSuccess: (success: string) => void;
  urls: Url[];
  setUrls: (url: Url) => void;
}

export const UrlForm = ({ setError, setSuccess, urls, setUrls }: UrlFormProps) => {
  const [form, setForm] = useState({
    originalUrl: '',
    alias: '',
    expiresAt: '',
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data: Url = await createShortUrl({
        originalUrl: form.originalUrl,
        alias: form.alias,
        expiresAt: form.expiresAt,
      });
      setUrls(data);
      setForm({ originalUrl: '', alias: '', expiresAt: '' });
      setSuccess('Short URL created successfully');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to create short URL');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      <h2>🔗 Create URL</h2>
      <form onSubmit={submit}>
        <div className={styles.form_group}>
          <label htmlFor="originalUrl">Original URL *</label>
          <input
            type="url"
            id="originalUrl"
            value={form.originalUrl}
            onChange={(e) => setForm({ ...form, originalUrl: e.target.value })}
            placeholder="https://example.com"
            required
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="alias">Custom Alias (optional)</label>
          <input
            type="text"
            id="alias"
            value={form.alias}
            onChange={(e) => setForm({ ...form, alias: e.target.value })}
            placeholder="my-custom-alias"
            maxLength={20}
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="expiresAt">Expiration Date (optional)</label>
          <input
            type="datetime-local"
            id="expiresAt"
            value={form.expiresAt}
            onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className={styles.submit_btn}
          disabled={
            loading ||
            !form.originalUrl ||
            (form.alias ? form.alias.length > 20 : false)
          }>
          {loading ? 'Creating...' : 'Create Short URL'}
        </button>
      </form>
    </div>
  )
}
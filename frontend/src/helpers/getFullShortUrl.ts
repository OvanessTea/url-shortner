export const getFullShortUrl = (shortUrl: string) => {
    return `${process.env.REACT_APP_API_URL}/${shortUrl}`;
}
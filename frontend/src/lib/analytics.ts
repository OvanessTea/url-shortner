import { getAnalyticsApi } from "../api/analytics";

export const getAnalytics = async (shortUrl: string) => {
    return await getAnalyticsApi(shortUrl);
}       
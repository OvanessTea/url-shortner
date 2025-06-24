import { shortenUrl } from "../api/shorten";
import { Url } from "../types/url.type";

export const createShortUrl = async (payload: { originalUrl: string, alias?: string, expiresAt?: string }) => {
    const data = {
        originalUrl: payload.originalUrl,
        ...(payload.alias && { alias: payload.alias }),
        ...(payload.expiresAt && { expiresAt: payload.expiresAt }),
    }
    const response = await shortenUrl(data);
    return response.data as Url;
}
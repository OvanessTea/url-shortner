import { deleteUrlApi, shortenUrlApi } from "../api/shorten";

export const createShortUrl = async (payload: { originalUrl: string, alias?: string, expiresAt?: string }) => {
    const data = {
        originalUrl: payload.originalUrl,
        ...(payload.alias && { alias: payload.alias }),
        ...(payload.expiresAt && { expiresAt: payload.expiresAt }),
    }
    return await shortenUrlApi(data);
}

export const deleteShortUrl = async (id: string) => {
    return await deleteUrlApi(id);
}
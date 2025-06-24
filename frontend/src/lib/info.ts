import { getUrlInfoApi } from "../api/info";

export const getUrlInfo = async (shortUrl: string) => {
    return await getUrlInfoApi(shortUrl);
}
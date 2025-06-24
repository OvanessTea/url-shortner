import axios from "axios";
import { urlFormatter } from "../helpers/urlFormatter";

export const getAnalyticsApi = async (shortUrl: string) => {
    const response = await axios.get(urlFormatter(`/analytics/${shortUrl}`));
    return response.data;
}
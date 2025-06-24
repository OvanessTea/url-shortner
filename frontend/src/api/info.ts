import axios from "axios";
import { urlFormatter } from "../helpers/urlFormatter";

export const getUrlInfoApi = async (shortUrl: string) => {
    const response = await axios.get(urlFormatter(`/info/${shortUrl}`));
    return response.data;
}; 
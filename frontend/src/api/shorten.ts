import axios from "axios";
import { urlFormatter } from "../lib/urlFormatter";

export const shortenUrl = async (payload: { alias?: string, expiresAt?: string }) => {
    console.log(urlFormatter("/shorten"));
    const response = await axios.post(urlFormatter("/shorten"), payload);
    return response.data;
}
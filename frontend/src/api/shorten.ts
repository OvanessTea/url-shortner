import axios from "axios";
import { urlFormatter } from "../helpers/urlFormatter";

export const shortenUrlApi = async (payload: { alias?: string, expiresAt?: string }) => {
    const response = await axios.post(urlFormatter("/shorten"), payload);
    return response.data;
}

export const deleteUrlApi = async (id: string) => {
    const response = await axios.delete(urlFormatter(`/delete/${id}`));
    return response.data;
}
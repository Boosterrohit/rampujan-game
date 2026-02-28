import { axiosInstance } from "@/utils/axiosInstance";
const baseUrl = `/admin/agents/players`;

export const getPlayers = (body:{
    page: number;
    limit: number
}) => {
     const {page = 1, limit = 12} = body || {};
    return axiosInstance.get(`${baseUrl}?page=${page}&limit=${limit}`);
}
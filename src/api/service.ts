import type { CreateServiceProductSchema } from "@kcaakash/validators";
import axios from "axios";


export async function createService(service: CreateServiceProductSchema){
    const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/service/add-service`, service, {
        withCredentials: true
    });

    return data;
}

export async function getService() {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/service/get-services`,{
        withCredentials: true
    });
    return data;
}
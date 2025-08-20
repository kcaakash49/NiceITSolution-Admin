import type { CreatePlanSchema } from "@kcaakash/validators";
import axios from "axios";

//creating plan for service
export async function createPlan(formData: CreatePlanSchema){
    const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/service/add-plan`, formData, {
        withCredentials: true
    });

    return data;
}

//getting all plans
export async function getPlan() {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/service/get-plans`,{
        withCredentials: true
    });

    return data;
}

//get plans based on service

export async function getPlanById(id: string){
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/service/get-plan/${id}`, {
        withCredentials: true
    });

    return data;
}
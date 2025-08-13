
import axios from "axios";


type CredentialType = {
    email: string
    password: string
}

export const loginAdmin = async(credentials: CredentialType) => {
    const { data } = await axios.post('http://localhost:4000/auth/signin', credentials ,{
        withCredentials: true
    });
    return data;
}

export const verifyCookie = async() => {
    console.log("Cookie Verification Called")
    const { data } = await axios.get("http://localhost:4000/auth/verify-cookie", {
        withCredentials: true
    });
    return data;
}
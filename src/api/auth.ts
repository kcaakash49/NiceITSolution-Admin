import axios from "axios";

type CredentialType = {
    email: string
    password: string
}

export const loginAdmin = async(credentials: CredentialType) => {
    const { data } = await axios.post('', credentials);
    return data;
}
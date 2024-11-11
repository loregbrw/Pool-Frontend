import axios from "axios"

export const api = axios.create({
    baseURL: "https://pool-backend-o7iw.onrender.com",
    timeout: 8000
})
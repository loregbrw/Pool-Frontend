import axios from "axios"
import { io } from "socket.io-client";

const baseURL = "https://pool-backend-o7iw.onrender.com";

export const api = axios.create({
    baseURL: baseURL,
    timeout: 500000
})

export const socket = io(baseURL);
import axios from "axios"

export const apiClient = axios.create({
    baseURL: "http://webdev.cs.vt.edu:8080/EmmanuelBookstoreReactTransact/",
    timeout: 10000,
    headers: {"Content-Type":"application/json"}
})
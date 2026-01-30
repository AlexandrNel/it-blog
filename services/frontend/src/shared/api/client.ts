import axios from 'axios'
import { API_URL } from '../config/env'

type BackendErrorType = {
    message: string
}

const instance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    validateStatus: () => true,
    headers: {
        "Content-Type": "Application/json"
    }
})
export const http = instance



export class ApiError extends Error {
    details?: unknown
    constructor(message: string, details?: unknown) {
        super(message)
        this.details = details
    }
}

export function isBackendError<T = unknown>(data: T | BackendErrorType): data is BackendErrorType {
    return !!data && typeof data === "object" && "message" in data
}

export type { BackendErrorType as BackendError }
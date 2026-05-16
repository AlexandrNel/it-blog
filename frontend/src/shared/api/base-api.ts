"use client";
import { api } from "./client";

export class BaseAPI {
	protected static async get<T>(url: string, params?: unknown) {
		const response = await api.get<T>(url, { params });
		return response.data;
	}

	protected static async post<T>(url: string, data?: unknown) {
		const response = await api.post<T>(url, data);
		return response.data;
	}

	protected static async put<T>(url: string, data?: unknown) {
		const response = await api.put<T>(url, data);
		return response.data;
	}

	protected static async patch<T>(url: string, data?: unknown) {
		const response = await api.patch<T>(url, data);
		return response.data;
	}

	protected static async delete<T>(url: string) {
		const response = await api.delete<T>(url);
		return response.data;
	}
}

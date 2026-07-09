"use client";

import { api } from "./client";

export class BaseAPI {
  protected static async get<T>(...parameters: Parameters<typeof api.get>) {
    const response = await api.get<T>(...parameters);
    return response.data;
  }

  protected static async post<T>(...parameters: Parameters<typeof api.post>) {
    const response = await api.post<T>(...parameters);
    return response.data;
  }

  protected static async put<T>(...parameters: Parameters<typeof api.put>) {
    const response = await api.put<T>(...parameters);
    return response.data;
  }

  protected static async patch<T>(...parameters: Parameters<typeof api.patch>) {
    const response = await api.patch<T>(...parameters);
    return response.data;
  }

  protected static async delete<T>(...parameters: Parameters<typeof api.delete>) {
    const response = await api.delete<T>(...parameters);
    return response.data;
  }
}

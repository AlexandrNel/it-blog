"use client";

import { instance } from "./instance";

export class BaseAPI {
  protected static async get<T>(...parameters: Parameters<typeof instance.get>) {
    const response = await instance.get<T>(...parameters);
    return response.data;
  }

  protected static async post<T>(...parameters: Parameters<typeof instance.post>) {
    const response = await instance.post<T>(...parameters);
    return response.data;
  }

  protected static async put<T>(...parameters: Parameters<typeof instance.put>) {
    const response = await instance.put<T>(...parameters);
    return response.data;
  }

  protected static async patch<T>(...parameters: Parameters<typeof instance.patch>) {
    const response = await instance.patch<T>(...parameters);
    return response.data;
  }

  protected static async delete<T>(...parameters: Parameters<typeof instance.delete>) {
    const response = await instance.delete<T>(...parameters);
    return response.data;
  }
}

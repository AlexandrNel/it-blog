import { api } from "@/shared/api";

export const uploadImage = async (
  formData: FormData,
  _onProgress?: (event: { progress: number }) => void,
  signal?: AbortSignal,
) => {
  const res = await api.post<{ url: string; path: string }>("/photos/upload", formData, {
    signal: signal,
    onUploadProgress: (_progressEvent) => {},
  });
  return res.data;
};

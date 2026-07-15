import { AxiosInstance } from "axios";
import { refreshInterceptor } from "./token";

export function applyInterceptors(instance: AxiosInstance) {
  refreshInterceptor(instance);
}

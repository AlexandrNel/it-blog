import type { UserResponse } from "@/entities/user";
import { api, BaseAPI, type GlobalSuccess } from "@/shared/api";

export class DemoAPI extends BaseAPI {
  static createDemoUser() {
    return api.post<GlobalSuccess & { user: UserResponse }>("/auth/demo");
  }
}

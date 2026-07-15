import { BaseAPI } from "@/shared/api/http";
import { type Tag } from "../model/types";

export class TagAPI extends BaseAPI {
  static getAll(): Promise<Tag[]> {
    return BaseAPI.get<Tag[]>("/tags");
  }
}

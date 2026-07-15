import { BaseAPI } from "@/shared/api/http";
import { type CategoryListReponse } from "../model/types";

export class CategoryAPI extends BaseAPI {
  static getAll() {
    return BaseAPI.get<CategoryListReponse>("/categories");
  }
}

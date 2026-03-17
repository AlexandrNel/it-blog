import {
  uniqueNamesGenerator,
  names,
  NumberDictionary,
} from "unique-names-generator";
import { ApiError } from "~/shared/lib/api-error.js";
import { prisma } from "~/shared/lib/prisma.js";

export class NicknameService {
  static async generateUnique(email?: string | null): Promise<string> {
    const number = NumberDictionary.generate({ length: 3 });
    const randomName = uniqueNamesGenerator({
      dictionaries: email ? [[email], number] : [names, number],
      style: "capital",
      separator: "",
    });
    return randomName;
  }
  static async isAvailable(nickname: string): Promise<boolean> {
    if (!nickname) throw ApiError.BadRequest("Не передан параметр");
    const isExist = await prisma.user.findUnique({ where: { nickname } });
    return !isExist;
  }
  //   async validate(nickname: string): Promise<boolean> {}
}

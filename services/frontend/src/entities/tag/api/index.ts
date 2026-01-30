import { http } from "@/shared/api/client"

export const getTagList = async (): Promise<string[]> => {
    const { data } = await http.get(`/tags`)
    return data
}
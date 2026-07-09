import { useQuery } from "@tanstack/react-query";
import { UserQueries } from "../api/queries";

export const useUser = () => {
  return useQuery(UserQueries.getMe());
};

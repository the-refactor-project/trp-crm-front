import { useQuery } from "@tanstack/react-query";
import { LeadStructure } from "../schema";

export const useLeadsQuery = (page = 1) => {
  return useQuery({
    queryKey: ["leads", page],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/leads?page=${page}`,
      );
      const body = (await response.json()) as {
        leads: LeadStructure[];
      };

      return body.leads;
    },
    staleTime: 5000,
  });
};

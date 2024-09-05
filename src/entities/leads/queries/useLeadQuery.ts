import { useQuery } from "@tanstack/react-query";
import { LeadStructure } from "../schema";

export const useLeadQuery = (leadId: LeadStructure["_id"]) => {
  return useQuery({
    queryKey: ["lead", leadId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/leads/${leadId}`,
      );
      const body = (await response.json()) as { lead: LeadStructure };

      return body.lead;
    },
    staleTime: 5000,
  });
};

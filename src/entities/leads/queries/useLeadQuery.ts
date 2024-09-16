import { useQuery } from "@tanstack/react-query";
import { LeadStructure } from "../schema";

export const useLeadQuery = (leadId: LeadStructure["_id"]) => {
  return useQuery({
    queryKey: ["lead", leadId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/leads/${leadId}`,
      );
      const { lead } = (await response.json()) as { lead: LeadStructure };

      return {
        ...lead,
        address: lead.address?.address,
        locality: lead.address?.locality,
        city: lead.address?.city,
        zip: lead.address?.zip,
        country: lead.address?.country,
      };
    },
    staleTime: 5000,
  });
};

import { useQuery } from "@tanstack/react-query";
import { LeadStructure } from "../../leads/schema";
import { LeadEventStructure } from "../schema";

export const useLeadEventsQuery = (leadId: LeadStructure["_id"]) => {
  return useQuery({
    queryKey: ["leadEvents", leadId],
    queryFn: async () => {
      const leadResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/leads/${leadId}`,
      );
      const leadBody = (await leadResponse.json()) as {
        lead: LeadStructure;
      };

      const leadEventsResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/lead-events/lead/${leadId}`,
      );
      const leadEventsBody = (await leadEventsResponse.json()) as {
        leadEvents: LeadEventStructure[];
      };

      return {
        lead: leadBody.lead,
        leadEvents: leadEventsBody.leadEvents,
      };
    },
    staleTime: 5000,
  });
};

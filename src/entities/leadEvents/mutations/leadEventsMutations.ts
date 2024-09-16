import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LeadEventFormDataStructure, LeadEventStructure } from "../schema";

export const useAddLeadEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newLeadEventData: LeadEventFormDataStructure) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/lead-events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newLeadEventData),
        },
      );

      if (!response.ok) {
        throw new Error("Error al crear el evento");
      }

      const { leadEvent: newLeadEvent } = (await response.json()) as {
        leadEvent: LeadEventStructure;
      };

      return newLeadEvent;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leadEvents"],
      });
    },
  });
};

export const useDeleteLeadEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (leadEventId: LeadEventStructure["_id"]) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/lead-events/${leadEventId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el evento");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leadEvents"],
      });
    },
  });
};

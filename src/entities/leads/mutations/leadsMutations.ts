import { useMutation } from "@tanstack/react-query";
import { LeadFormDataStructure, LeadStructure } from "../schema";

export const useAddLeadMutation = () => {
  return useMutation({
    mutationFn: async (newLeadData: LeadFormDataStructure) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLeadData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el lead");
      }

      const { lead: newLead } = (await response.json()) as {
        lead: LeadStructure;
      };

      return newLead;
    },
  });
};

export const useUpdateLeadMutation = () => {
  return useMutation({
    mutationFn: async (lead: LeadStructure) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/leads`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lead),
      });

      if (!response.ok) {
        throw new Error("Error al modificar el lead");
      }

      const { lead: updatedLead } = (await response.json()) as {
        lead: LeadStructure;
      };

      return updatedLead;
    },
  });
};

export const useDeleteLead = () => {
  return useMutation({
    mutationFn: async (leadId: LeadStructure["_id"]) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/leads/${leadId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el lead");
      }
    },
  });
};

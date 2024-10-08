import { useMutation } from "@tanstack/react-query";
import {
  LeadDataStructure,
  LeadFormDataStructure,
  LeadStructure,
} from "../schema";

export const useAddLeadMutation = () => {
  return useMutation({
    mutationFn: async (newLeadFormData: LeadFormDataStructure) => {
      const newLeadData: LeadDataStructure = {
        ...newLeadFormData,
        entryDate: new Date(newLeadFormData.entryDate),
        address: {
          address: newLeadFormData.address,
          locality: newLeadFormData.locality,
          city: newLeadFormData.city,
          country: newLeadFormData.country,
          zip: newLeadFormData.zip,
        },
      };

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
    mutationFn: async (lead: LeadFormDataStructure) => {
      const leadData: LeadDataStructure = {
        ...lead,
        entryDate: new Date(lead.entryDate),
        address: {
          address: lead.address,
          locality: lead.locality,
          city: lead.city,
          zip: lead.zip,
          country: lead.country,
        },
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/leads`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
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

export const useDeleteLeadMutation = () => {
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

export const useImportLeadsMutation = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/leads/import`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Error al importar los leads");
      }
    },
  });
};

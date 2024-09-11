import { useMutation } from "@tanstack/react-query";
import {
  ProviderDataStructure,
  ProviderFormDataStructure,
  ProviderStructure,
} from "../schema";

export const useAddProviderMutation = () => {
  return useMutation({
    mutationFn: async (newProviderFormData: ProviderFormDataStructure) => {
      const newProviderData: ProviderDataStructure = {
        name: newProviderFormData.name,
        commercialName: newProviderFormData.commercialName,
        nif: newProviderFormData.nif,
        vat: newProviderFormData.vat,
        currency: newProviderFormData.currency,
        email: newProviderFormData.email,
        phoneNumber: newProviderFormData.phoneNumber,
        address: {
          address: newProviderFormData.address,
          locality: newProviderFormData.locality,
          city: newProviderFormData.city,
          country: newProviderFormData.country,
          zip: newProviderFormData.zip,
        },
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/providers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProviderData),
        },
      );

      if (!response.ok) {
        throw new Error("Error al crear el provider");
      }

      const { provider: newProvider } = (await response.json()) as {
        provider: ProviderStructure;
      };

      return newProvider;
    },
  });
};

export const useUpdateProviderMutation = () => {
  return useMutation({
    mutationFn: async (providerFormData: ProviderFormDataStructure) => {
      const providerData: ProviderStructure = {
        _id: providerFormData._id,
        name: providerFormData.name,
        commercialName: providerFormData.commercialName,
        nif: providerFormData.nif,
        vat: providerFormData.vat,
        currency: providerFormData.currency,
        email: providerFormData.email,
        phoneNumber: providerFormData.phoneNumber,
        address: {
          address: providerFormData.address,
          locality: providerFormData.locality,
          city: providerFormData.city,
          country: providerFormData.country,
          zip: providerFormData.zip,
        },
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/providers`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(providerData),
        },
      );

      if (!response.ok) {
        throw new Error("Error al modificar el provider");
      }

      const { provider: updatedProvider } = (await response.json()) as {
        provider: ProviderStructure;
      };

      return updatedProvider;
    },
  });
};

export const useDeleteProviderMutation = () => {
  return useMutation({
    mutationFn: async (providerId: ProviderStructure["_id"]) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/providers/${providerId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el proveedor");
      }
    },
  });
};

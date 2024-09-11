import { useQuery } from "@tanstack/react-query";
import { ProviderStructure } from "../schema";

export const useProviderQuery = (providerId: ProviderStructure["_id"]) => {
  return useQuery({
    queryKey: ["provider", providerId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/providers/${providerId}`,
      );
      const body = (await response.json()) as { provider: ProviderStructure };

      return body.provider;
    },
    staleTime: 5000,
  });
};

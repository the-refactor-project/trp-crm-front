import { useQuery } from "@tanstack/react-query";
import { ProviderStructure } from "../schema";

export const useProvidersQuery = (page = 1) => {
  return useQuery({
    queryKey: ["providers", page],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/providers?page=${page}`,
      );
      const body = (await response.json()) as {
        providers: ProviderStructure[];
      };

      return body.providers;
    },
    staleTime: 5000,
  });
};

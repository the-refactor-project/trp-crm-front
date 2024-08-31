import { useQuery } from "@tanstack/react-query";
import { MovementStructure } from "../schema";

export const useMovementsQuery = (page: number) => {
  return useQuery({
    queryKey: ["movements", page],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movements?page=${page}`,
      );
      return response.json() as Promise<{ movements: MovementStructure[] }>;
    },
    staleTime: 5000,
  });
};

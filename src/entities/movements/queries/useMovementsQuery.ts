import { useQuery } from "@tanstack/react-query";
import { MovementStructure } from "../schema";

export const useMovementsQuery = (page: number) => {
  return useQuery({
    queryKey: ["movements", page],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movements?page=${page}`,
      );
      const body = (await response.json()) as {
        movements: MovementStructure[];
      };

      return body.movements;
    },
    staleTime: 5000,
  });
};

import { useQuery } from "@tanstack/react-query";
import { MovementStructure } from "../schema";

export const useMovementQuery = (movementId: MovementStructure["_id"]) => {
  return useQuery({
    queryKey: ["movement", movementId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movements/${movementId}`,
      );
      const body = (await response.json()) as { movement: MovementStructure };

      return body.movement;
    },
    staleTime: 5000,
  });
};

import { useMutation } from "@tanstack/react-query";
import { MovementFormDataStructure, MovementStructure } from "../schema";

export const useAddMovementMutation = () => {
  return useMutation({
    mutationFn: async (newMovementData: MovementFormDataStructure) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movements`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMovementData),
        },
      );

      if (!response.ok) {
        throw new Error("Error al crear el movimiento");
      }

      const { movement: newMovement } = (await response.json()) as {
        movement: MovementStructure;
      };

      return newMovement;
    },
  });
};

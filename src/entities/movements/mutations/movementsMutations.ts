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

export const useUpdateMovementMutation = () => {
  return useMutation({
    mutationFn: async (movement: MovementStructure) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movements`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movement),
        },
      );

      if (!response.ok) {
        throw new Error("Error al modificar el movimiento");
      }

      const { movement: updatedMovement } = (await response.json()) as {
        movement: MovementStructure;
      };

      return updatedMovement;
    },
  });
};

export const useDeleteMovementMutation = () => {
  return useMutation({
    mutationFn: async (movementId: MovementStructure["_id"]) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movements/${movementId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el movimiento");
      }
    },
  });
};

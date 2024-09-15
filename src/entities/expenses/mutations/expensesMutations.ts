import { useMutation } from "@tanstack/react-query";
import { ExpenseFormDataStructure, ExpenseStructure } from "../schema";

export const useAddExpenseMutation = () => {
  return useMutation({
    mutationFn: async (newExpenseData: ExpenseFormDataStructure) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpenseData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el gasto");
      }

      const { expense: newExpense } = (await response.json()) as {
        expense: ExpenseStructure;
      };

      return newExpense;
    },
  });
};

/* export const useUpdateMovementMutation = () => {
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
}; */

export const useDeleteExpenseMutation = () => {
  return useMutation({
    mutationFn: async (expenseId: ExpenseStructure["_id"]) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/expenses/${expenseId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el gasto");
      }
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { ExpenseStructure } from "../schema";

export const useExpensesQuery = (page = 1) => {
  return useQuery({
    queryKey: ["expenses", page],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/expenses?page=${page}`,
      );
      const body = (await response.json()) as {
        expenses: ExpenseStructure[];
      };

      return body.expenses;
    },
    staleTime: 5000,
  });
};

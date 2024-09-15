import { useQuery } from "@tanstack/react-query";
import { ExpenseStructure } from "../schema";

export const useExpensesByStartQuery = (start = 1) => {
  return useQuery({
    queryKey: ["expenses/start", start],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/expenses/start?start=${start}`,
      );
      const body = (await response.json()) as {
        expenses: ExpenseStructure[];
      };

      return body.expenses;
    },
    staleTime: 5000,
  });
};

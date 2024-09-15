import { z } from "zod";

export const expenseSchema = z.object({
  _id: z.string(),
  description: z.string(),
  currency: z.enum(["EUR", "USD"]),
  quantity: z.number(),
  isCard: z.boolean(),
  date: z.date(),
  providerId: z.string(),
  movementId: z.string().optional(),
});

export type ExpenseStructure = z.infer<typeof expenseSchema>;
export type ExpenseDataStructure = Omit<ExpenseStructure, "_id">;
export type ExpenseFormDataStructure = Omit<ExpenseDataStructure, "date"> & {
  date: string | Date;
};

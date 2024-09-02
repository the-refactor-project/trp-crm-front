import { z } from "zod";

export const movementSchema = z.object({
  _id: z.string(),
  type: z.enum(["in", "out"]),
  description: z.string(),
  currency: z.enum(["EUR", "USD"]),
  quantity: z.number(),
  date: z.date(),
});

export type MovementStructure = z.infer<typeof movementSchema>;
export type MovementDataStructure = Omit<MovementStructure, "id">;
export type MovementFormDataStructure = Omit<MovementDataStructure, "date"> & {
  date: string | Date;
};

import { z } from "zod";

export const leadEventSchema = z.object({
  _id: z.string(),
  description: z.string(),
  date: z.date(),
  leadId: z.string(),
});

export type LeadEventStructure = z.infer<typeof leadEventSchema>;
export type LeadEventDataStructure = Omit<LeadEventStructure, "_id">;
export type LeadEventFormDataStructure = Omit<
  LeadEventDataStructure,
  "date"
> & {
  date: string | Date;
};

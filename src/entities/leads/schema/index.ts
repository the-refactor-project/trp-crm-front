import { z } from "zod";

export const addressSchema = z.object({
  locality: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  address: z.string().optional(),
});

export const leadSchema = z.object({
  _id: z.string(),
  name: z.string(),
  lastName: z.string().optional(),
  nif: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  address: addressSchema.optional(),
  channel: z.string().optional(),
  origin: z.string().optional(),
  referralOf: z.string().optional(),
  askedFor: z.string().optional(),
  formComments: z.string().optional(),
  entryDate: z.date(),
});

export type LeadStructure = z.infer<typeof leadSchema>;
export type LeadDataStructure = Omit<LeadStructure, "_id">;
export type LeadFormDataStructure = Omit<LeadDataStructure, "entryDate"> & {
  entryDate: string | Date;
};

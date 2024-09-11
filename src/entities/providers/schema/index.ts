import { z } from "zod";

export const addressSchema = z.object({
  locality: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  address: z.string().optional(),
});

export const providerSchema = z.object({
  _id: z.string(),
  name: z.string(),
  commercialName: z.string().optional(),
  nif: z.string(),
  vat: z.string(),
  email: z.string().email().optional(),
  currency: z.enum(["EUR", "USD"]),
  phoneNumber: z.string().optional(),
  address: addressSchema.optional(),
});

export type ProviderStructure = z.infer<typeof providerSchema>;
export type ProviderDataStructure = Omit<ProviderStructure, "_id">;
export type ProviderFormDataStructure = Omit<ProviderStructure, "address"> &
  z.infer<typeof addressSchema>;

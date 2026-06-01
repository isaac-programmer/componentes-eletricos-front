import z from "zod";

export interface ApiErrorResponse {
  message: string | string[];
  statusCode: number;
  error?: string;
  errors?: Array<{ message: string }>;
}

export const apiErrorSchema = z.object({
  message: z.union([z.string(), z.array(z.string())]),
  statusCode: z.number(),
  error: z.string().optional(),
  errors: z.array(z.object({
    message: z.string()
  })).optional(),
});
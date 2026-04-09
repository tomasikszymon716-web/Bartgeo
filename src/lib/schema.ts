import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^(\+48\s?)?(\d[\s-]?){9}$/, 'Invalid phone number'),
  subject: z.string().min(1),
  message: z.string().min(5).max(1000),
});

export type ContactFormData = z.infer<typeof contactSchema>;

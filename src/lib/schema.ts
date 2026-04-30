import { z } from 'zod';

/**
 * Creates a contact form schema with localized error messages.
 * Pass the `t` function from i18next.
 */
export function createContactSchema(t: (key: string) => string) {
  return z.object({
    name: z
      .string()
      .min(2, t('validation.name_min'))
      .max(100, t('validation.name_max')),
    email: z
      .string()
      .min(1, t('validation.required'))
      .email(t('validation.email_invalid')),
    phone: z
      .string()
      .min(1, t('validation.required'))
      .regex(/^(\+\d{1,4}\s?)?[\d\s-]{6,15}$/, t('validation.phone_invalid')),
    subject: z
      .string()
      .min(1, t('validation.subject_required')),
    message: z
      .string()
      .min(5, t('validation.message_min'))
      .max(1000, t('validation.message_max')),
  });
}

export type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;

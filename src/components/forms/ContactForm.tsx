import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { createContactSchema, type ContactFormData } from '../../lib/schema';
import { sendContactForm } from '../../lib/webhook';
import { Toast } from '../ui/Toast';
import { CustomSelect } from '../ui/CustomSelect';
import { PhoneInput } from '../ui/PhoneInput';

const subjectKeys = ['map', 'stake', 'inventory', 'division', 'boundary', 'legal', 'consultation', 'other'] as const;

export function ContactForm() {
  const { t, i18n } = useTranslation();
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  /* Recreate schema when language changes */
  const schema = useMemo(() => createContactSchema(t), [t, i18n.language]);

  const subjectOptions = useMemo(
    () =>
      subjectKeys.map((key) => ({
        value: t(`contact.form.subjects.${key}`),
        label: t(`contact.form.subjects.${key}`),
      })),
    [t, i18n.language],
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '' },
  });

  const messageValue = watch('message') ?? '';

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      await sendContactForm(data);
      setToast({ type: 'success', message: t('contact.form.success') });
      reset();
    } catch {
      setToast({ type: 'error', message: t('contact.form.error') });
    }
  };

  const inputBase =
    'w-full bg-transparent border border-[var(--color-line)] rounded-xl px-4 pt-6 pb-2 text-base text-[var(--color-ink)] placeholder-transparent outline-none transition-all duration-200 peer hover:border-[var(--color-line-strong)]';
  const inputError =
    'w-full bg-transparent border border-[#D4634B] rounded-xl px-4 pt-6 pb-2 text-base text-[var(--color-ink)] placeholder-transparent outline-none transition-all duration-200 peer focus:border-[#D4634B] focus:ring-1 focus:ring-[#D4634B]/30';
  const inputFocus = 'focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]';
  const labelBase =
    'absolute left-4 top-4 text-sm text-[var(--color-muted)] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[var(--color-gold)] peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs';

  const errorMsg = (msg?: string) =>
    msg ? (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[#D4634B] text-xs mt-1.5 pl-1"
        role="alert"
      >
        {msg}
      </motion.p>
    ) : null;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-5" noValidate>
        {/* Name */}
        <div className="relative">
          <input
            {...register('name')}
            id="name"
            placeholder=" "
            className={`${errors.name ? inputError : `${inputBase} ${inputFocus}`}`}
            autoComplete="name"
          />
          <label htmlFor="name" className={labelBase}>
            {t('contact.form.name')} *
          </label>
          {errorMsg(errors.name?.message)}
        </div>

        {/* Email */}
        <div className="relative">
          <input
            {...register('email')}
            id="email"
            type="email"
            placeholder=" "
            className={`${errors.email ? inputError : `${inputBase} ${inputFocus}`}`}
            autoComplete="email"
          />
          <label htmlFor="email" className={labelBase}>
            {t('contact.form.email')} *
          </label>
          {errorMsg(errors.email?.message)}
        </div>

        {/* Phone with country selector */}
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              id="phone"
              value={field.value}
              onChange={field.onChange}
              label={t('contact.form.phone')}
              error={errors.phone?.message}
            />
          )}
        />

        {/* Subject — custom select */}
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <CustomSelect
              id="subject"
              options={subjectOptions}
              value={field.value}
              onChange={field.onChange}
              label={t('contact.form.subject')}
              placeholder={t('contact.form.subject')}
              error={errors.subject?.message}
            />
          )}
        />

        {/* Message */}
        <div className="relative">
          <textarea
            {...register('message')}
            id="message"
            placeholder=" "
            rows={4}
            maxLength={1000}
            className={`${errors.message ? inputError : `${inputBase} ${inputFocus}`} resize-none`}
          />
          <label htmlFor="message" className={labelBase}>
            {t('contact.form.message')} *
          </label>
          <span className="absolute right-4 bottom-2 text-xs text-[var(--color-muted)] font-mono">
            {messageValue.length}/1000
          </span>
          {errorMsg(errors.message?.message)}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center rounded-full py-3.5 px-8 text-[15px] font-semibold tracking-[-0.01em] bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-[var(--color-gold-hi)] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            t('contact.form.submit')
          )}
        </button>

        <p className="font-mono text-xs text-[var(--color-muted)] text-center tracking-[0.02em]">
          {t('contact.form.privacy_note')}
        </p>

        <Toast
          message={toast?.message ?? ''}
          type={toast?.type ?? 'success'}
          visible={!!toast}
          onClose={() => setToast(null)}
        />
      </form>
    </>
  );
}

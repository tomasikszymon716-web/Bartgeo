import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { contactSchema, type ContactFormData } from '../../lib/schema';
import { sendContactForm } from '../../lib/webhook';
import { Toast } from '../ui/Toast';

const subjectKeys = ['map', 'stake', 'inventory', 'division', 'boundary', 'legal', 'consultation', 'other'] as const;

export function ContactForm() {
  const { t } = useTranslation();
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '' },
  });

  const messageValue = watch('message') ?? '';

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
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

  const inputBase = 'w-full bg-transparent border border-[var(--color-line)] rounded-xl px-4 pt-6 pb-2 text-base text-[var(--color-ink)] placeholder-transparent focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-colors peer';
  const labelBase = 'absolute left-4 top-4 text-sm text-[var(--color-muted)] transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[var(--color-gold)] peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs';

  return (
    <>
      <Toast
        message={toast?.message ?? ''}
        type={toast?.type ?? 'success'}
        visible={!!toast}
        onClose={() => setToast(null)}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Name */}
        <div className="relative">
          <input {...register('name')} id="name" placeholder=" " className={inputBase} autoComplete="name" />
          <label htmlFor="name" className={labelBase}>{t('contact.form.name')} *</label>
          {errors.name && <p className="text-red-500 text-xs mt-1" role="alert">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="relative">
          <input {...register('email')} id="email" type="email" placeholder=" " className={inputBase} autoComplete="email" />
          <label htmlFor="email" className={labelBase}>{t('contact.form.email')} *</label>
          {errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div className="relative">
          <input {...register('phone')} id="phone" type="tel" placeholder=" " className={inputBase} autoComplete="tel" />
          <label htmlFor="phone" className={labelBase}>{t('contact.form.phone')} *</label>
          {errors.phone && <p className="text-red-500 text-xs mt-1" role="alert">{errors.phone.message}</p>}
        </div>

        {/* Subject */}
        <div className="relative">
          <select {...register('subject')} id="subject" className={`${inputBase} cursor-pointer appearance-none`} defaultValue="">
            <option value="" disabled></option>
            {subjectKeys.map((key) => (
              <option key={key} value={t(`contact.form.subjects.${key}`)}>{t(`contact.form.subjects.${key}`)}</option>
            ))}
          </select>
          <label htmlFor="subject" className="absolute left-4 top-1.5 text-xs text-[var(--color-muted)] pointer-events-none">{t('contact.form.subject')} *</label>
          {errors.subject && <p className="text-red-500 text-xs mt-1" role="alert">{errors.subject.message}</p>}
        </div>

        {/* Message */}
        <div className="relative">
          <textarea {...register('message')} id="message" placeholder=" " rows={4} maxLength={1000} className={`${inputBase} resize-none`} />
          <label htmlFor="message" className={labelBase}>{t('contact.form.message')} *</label>
          <span className="absolute right-4 bottom-2 text-xs text-[var(--color-muted)]">{messageValue.length}/1000</span>
          {errors.message && <p className="text-red-500 text-xs mt-1" role="alert">{errors.message.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center rounded-full py-3.5 px-8 text-[15px] font-semibold tracking-[-0.01em] bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-[var(--color-gold-hi)] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : t('contact.form.submit')}
        </button>

        <p className="font-mono text-xs text-[var(--color-muted)] text-center tracking-[0.02em]">
          {t('contact.form.privacy_note')}
        </p>
      </form>
    </>
  );
}

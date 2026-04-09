import type { ContactFormData } from './schema';

export async function sendContactForm(data: ContactFormData): Promise<void> {
  const url = import.meta.env.VITE_N8N_WEBHOOK_URL;
  if (!url) throw new Error('Brak konfiguracji webhooka.');

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
      source: 'bartgeo.pl',
    }),
  });

  if (!res.ok) throw new Error(`Webhook error: ${res.status}`);
}

import type { ContactFormData } from './schema';

export async function sendContactForm(data: ContactFormData): Promise<void> {
  console.log('[form] Submitting contact form...');
  console.log('[form] Payload:', JSON.stringify(data, null, 2));

  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    }),
  });

  const result = await res.json();
  console.log('[form] Response status:', res.status);
  console.log('[form] Response body:', result);

  if (!res.ok) {
    console.error('[form] Submit failed:', result);
    throw new Error(result.error || `Server error: ${res.status}`);
  }

  console.log('[form] Email sent successfully! ID:', result.id);
}

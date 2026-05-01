import type { VercelRequest, VercelResponse } from '@vercel/node';

/* ─────────────────────────────────────────────
   BartGeo Contact Form → Resend Email Handler
   ───────────────────────────────────────────── */

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === 'string' && b.name.length >= 2 &&
    typeof b.email === 'string' && b.email.includes('@') &&
    typeof b.phone === 'string' && b.phone.length >= 6 &&
    typeof b.subject === 'string' && b.subject.length > 0 &&
    typeof b.message === 'string' && b.message.length >= 5
  );
}

function buildEmailHtml(data: ContactPayload): string {
  const now = new Date().toLocaleString('pl-PL', {
    timeZone: 'Europe/Warsaw',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Nowe zapytanie ze strony</title>
</head>
<body style="margin:0; padding:0; background-color:#EEEEE8; font-family:'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#EEEEE8; padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="540" cellpadding="0" cellspacing="0" style="max-width:540px; width:100%;">

          <!-- Brand bar -->
          <tr>
            <td style="padding:0 4px 24px 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align:middle; padding-right:10px;">
                          <img src="https://bartgeo.vercel.app/brand/logo-icon.png" alt="BartGeo" width="34" height="34" style="display:block; border-radius:50%;" />
                        </td>
                        <td style="vertical-align:middle;">
                          <span style="font-size:19px; font-weight:700; letter-spacing:-0.3px;">
                            <span style="font-style:italic; color:#F0A500;">Bart</span><span style="font-style:italic; color:#2D4057;">Geo</span>
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="font-size:12px; color:#6B7480;">${now}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:16px; overflow:hidden;">

                <!-- Gold accent -->
                <tr>
                  <td style="height:4px; background-color:#F0A500; font-size:1px; line-height:1px;">&nbsp;</td>
                </tr>

                <!-- Title section -->
                <tr>
                  <td style="padding:36px 36px 0 36px;">
                    <h1 style="margin:0; font-size:21px; font-weight:700; color:#0E1620; letter-spacing:-0.3px;">
                      Nowe zapytanie ze strony
                    </h1>
                    <p style="margin:6px 0 0 0; font-size:13px; color:#6B7480;">
                      Formularz kontaktowy na <span style="color:#F0A500; font-weight:600;">bartgeo.pl</span>
                    </p>
                  </td>
                </tr>

                <!-- Contact info card -->
                <tr>
                  <td style="padding:28px 36px 0 36px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAFAF7; border-radius:12px;">

                      <!-- Name -->
                      <tr>
                        <td style="padding:18px 22px 14px 22px;">
                          <span style="font-size:10px; font-weight:700; color:#9CA3AF; text-transform:uppercase; letter-spacing:1px;">Imię i nazwisko</span>
                          <div style="margin-top:4px; font-size:15px; font-weight:600; color:#0E1620; line-height:22px;">
                            ${escapeHtml(data.name)}
                          </div>
                        </td>
                      </tr>

                      <tr><td style="padding:0 22px;"><div style="height:1px; background-color:#E6E4DC;"></div></td></tr>

                      <!-- Email -->
                      <tr>
                        <td style="padding:14px 22px;">
                          <span style="font-size:10px; font-weight:700; color:#9CA3AF; text-transform:uppercase; letter-spacing:1px;">Email</span>
                          <div style="margin-top:4px;">
                            <a href="mailto:${escapeHtml(data.email)}" style="font-size:15px; font-weight:600; color:#F0A500; text-decoration:none; line-height:22px;">
                              ${escapeHtml(data.email)}
                            </a>
                          </div>
                        </td>
                      </tr>

                      <tr><td style="padding:0 22px;"><div style="height:1px; background-color:#E6E4DC;"></div></td></tr>

                      <!-- Phone -->
                      <tr>
                        <td style="padding:14px 22px;">
                          <span style="font-size:10px; font-weight:700; color:#9CA3AF; text-transform:uppercase; letter-spacing:1px;">Telefon</span>
                          <div style="margin-top:4px;">
                            <a href="tel:${escapeHtml(data.phone.replace(/\s/g, ''))}" style="font-size:15px; font-weight:600; color:#0E1620; text-decoration:none; line-height:22px;">
                              ${escapeHtml(data.phone)}
                            </a>
                          </div>
                        </td>
                      </tr>

                      <tr><td style="padding:0 22px;"><div style="height:1px; background-color:#E6E4DC;"></div></td></tr>

                      <!-- Subject -->
                      <tr>
                        <td style="padding:14px 22px 18px 22px;">
                          <span style="font-size:10px; font-weight:700; color:#9CA3AF; text-transform:uppercase; letter-spacing:1px;">Temat</span>
                          <div style="margin-top:6px;">
                            <span style="display:inline-block; font-size:12px; font-weight:700; color:#0E1620; background-color:#FFF4DC; padding:6px 16px; border-radius:20px; border:1px solid rgba(240,165,0,0.25);">
                              ${escapeHtml(data.subject)}
                            </span>
                          </div>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>

                <!-- Message section -->
                <tr>
                  <td style="padding:28px 36px 36px 36px;">
                    <span style="font-size:10px; font-weight:700; color:#9CA3AF; text-transform:uppercase; letter-spacing:1px;">Wiadomość</span>
                    <div style="margin-top:10px; background-color:#FAFAF7; border-radius:12px; padding:20px 22px; border-left:3px solid #F0A500;">
                      <p style="margin:0; font-size:14px; line-height:1.75; color:#1F2A36; white-space:pre-wrap;">${escapeHtml(data.message)}</p>
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 4px 0 4px; text-align:center;">
              <span style="font-size:11px; color:#9CA3AF;">
                Wysłano z formularza na <span style="color:#F0A500;">bartgeo.pl</span>
              </span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log(`[contact] Rejected method: ${req.method}`);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate payload
  const body = req.body;
  console.log('[contact] Received payload:', JSON.stringify(body, null, 2));

  if (!isValidPayload(body)) {
    console.log('[contact] Validation failed — invalid payload');
    return res.status(400).json({ error: 'Invalid form data' });
  }

  // Build email
  const html = buildEmailHtml(body);
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    console.error('[contact] RESEND_API_KEY is not set!');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const emailPayload = {
    from: 'BARTGEO <kontakt@bartgeo.pl>',
    to: 'bbartgeo@gmail.com',
    subject: `Nowe zapytanie: ${body.subject}`,
    html,
    reply_to: body.email,
  };

  console.log('[contact] Sending email via Resend...');
  console.log('[contact] From:', emailPayload.from);
  console.log('[contact] To:', emailPayload.to);
  console.log('[contact] Reply-To:', emailPayload.reply_to);
  console.log('[contact] Subject:', emailPayload.subject);

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    const resendData = await resendRes.json();
    console.log('[contact] Resend response status:', resendRes.status);
    console.log('[contact] Resend response body:', JSON.stringify(resendData, null, 2));

    if (!resendRes.ok) {
      console.error('[contact] Resend API error:', resendData);
      return res.status(502).json({
        error: 'Failed to send email',
        details: resendData,
      });
    }

    console.log('[contact] Email sent successfully! ID:', resendData.id);
    return res.status(200).json({ success: true, id: resendData.id });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

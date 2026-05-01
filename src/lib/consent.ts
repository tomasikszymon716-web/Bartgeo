/*
 * Cookie consent state — persisted in localStorage.
 *
 * "essential" cookies (Vercel/CDN, language preference, this consent
 * record itself) are always on and don't need consent under PUKE/RODO.
 * "analytics" gates Google Analytics — set only after explicit accept.
 *
 * VERSION bump re-prompts every visitor (use when the cookie banner
 * scope materially changes — e.g. adding a new third-party tracker).
 */

export type ConsentCategory = 'essential' | 'analytics';

export interface ConsentRecord {
  version: number;
  acceptedAt: number;
  /** True ⇒ user accepted analytics. Essential is implicit. */
  analytics: boolean;
}

const KEY = 'bartgeo:cookie-consent';
const VERSION = 1;
export const CONSENT_EVENT = 'bartgeo:consent-change';

function safeRead(): ConsentRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (parsed.version !== VERSION) return null;
    if (typeof parsed.analytics !== 'boolean') return null;
    return parsed as ConsentRecord;
  } catch {
    return null;
  }
}

function safeWrite(rec: ConsentRecord) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(rec));
  } catch {
    /* private mode / quota — silently ignore */
  }
  window.dispatchEvent(new CustomEvent<ConsentRecord>(CONSENT_EVENT, { detail: rec }));
}

export function getConsent(): ConsentRecord | null {
  return safeRead();
}

export function hasDecided(): boolean {
  return safeRead() !== null;
}

export function isAllowed(category: ConsentCategory): boolean {
  if (category === 'essential') return true;
  const rec = safeRead();
  return rec?.[category] === true;
}

export function setConsent(opts: { analytics: boolean }) {
  safeWrite({
    version: VERSION,
    acceptedAt: Date.now(),
    analytics: opts.analytics,
  });
}

export function acceptAll() {
  setConsent({ analytics: true });
}

export function rejectAll() {
  setConsent({ analytics: false });
}

/** Clears the consent record so the banner re-appears (debug / "manage cookies"). */
export function resetConsent() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent<ConsentRecord | null>(CONSENT_EVENT, { detail: null }));
}

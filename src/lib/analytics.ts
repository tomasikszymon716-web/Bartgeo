/*
 * Google Analytics 4 loader — gated behind explicit consent.
 *
 * Reads the GA measurement ID from VITE_GA_ID at build time. If the
 * env var is absent or still the placeholder, we silently skip
 * loading so dev builds don't ping production analytics.
 *
 * The script is injected only AFTER `setConsent({ analytics: true })`
 * fires the consent event — never at app boot.
 */

import { CONSENT_EVENT, isAllowed, type ConsentRecord } from './consent';

const GA_ID = (import.meta.env.VITE_GA_ID as string | undefined)?.trim();
const VALID_ID = /^G-[A-Z0-9]{6,}$/;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let injected = false;

function injectGtag() {
  if (injected) return;
  if (typeof window === 'undefined') return;
  if (!GA_ID || !VALID_ID.test(GA_ID)) return;
  injected = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
}

/** Call once at app boot. Loads GA immediately if consent is already granted; otherwise listens for grant. */
export function initAnalyticsConsentBridge() {
  if (typeof window === 'undefined') return;
  if (isAllowed('analytics')) {
    injectGtag();
  }
  window.addEventListener(CONSENT_EVENT, (e) => {
    const rec = (e as CustomEvent<ConsentRecord | null>).detail;
    if (rec?.analytics) injectGtag();
  });
}

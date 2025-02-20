type FacebookEvent = 'track' | 'init'
type FacebookTrackEvent = 'PageView' | 'CompleteRegistration'

declare global {
  interface Window {
    fbq: {
      (event: FacebookEvent, pixelId: string): void;
      (event: 'track', eventName: FacebookTrackEvent): void;
    };
  }
}

export const trackRegistration = (): void => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'CompleteRegistration');
  }
}

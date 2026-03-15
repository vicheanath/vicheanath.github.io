import { useEffect } from 'react';
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from '../lib/site';

const ADSENSE_SCRIPT_ID = 'adsense-script';

export default function AdSenseBootstrap() {
  useEffect(() => {
    // Keep Google ad code off the page until regional consent tooling is ready.
    if (!ADSENSE_ENABLED) {
      document.getElementById(ADSENSE_SCRIPT_ID)?.remove();
      return;
    }

    if (document.getElementById(ADSENSE_SCRIPT_ID)) {
      return;
    }

    const script = document.createElement('script');
    script.id = ADSENSE_SCRIPT_ID;
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, []);

  return null;
}

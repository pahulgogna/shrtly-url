import { useEffect } from "react";

const GoogleAds = () => {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${import.meta.env.VITE_GOOGLE_ADSENSE_ID}`
    script.async = true
    script.crossOrigin="anonymous"
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default GoogleAds;

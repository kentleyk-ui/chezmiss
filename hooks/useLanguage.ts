import { useEffect, useState } from "react";
import { Language, translations, TranslationKey } from "@/lib/translations";

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("fr");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check localStorage first
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && savedLanguage in translations) {
      setLanguage(savedLanguage);
      return;
    }

    // Get browser/OS language
    const browserLangs = navigator.languages || [navigator.language];
    let detectedLang: Language = "fr"; // default

    for (const lang of browserLangs) {
      const primaryLang = lang.split("-")[0].toLowerCase();

      if (primaryLang === "en") {
        detectedLang = "en";
        break;
      } else if (primaryLang === "es") {
        detectedLang = "es";
        break;
      } else if (primaryLang === "fr") {
        detectedLang = "fr";
        break;
      }
    }

    setLanguage(detectedLang);
    localStorage.setItem("language", detectedLang);
  }, []);

  const setLang = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.fr[key] || key;
  };

  return { language, setLanguage: setLang, t, isClient };
}


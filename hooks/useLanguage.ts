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

    // Get browser language
    const browserLang = navigator.language.split("-")[0].toLowerCase();
    let detectedLang: Language = "fr"; // default

    if (browserLang === "en") {
      detectedLang = "en";
    } else if (browserLang === "es") {
      detectedLang = "es";
    } else if (browserLang === "fr") {
      detectedLang = "fr";
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

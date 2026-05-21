"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { Globe } from "lucide-react";
import { useState } from "react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "fr" as const, name: "Français", flag: "🇫🇷" },
    { code: "en" as const, name: "English", flag: "🇬🇧" },
    { code: "es" as const, name: "Español", flag: "🇪🇸" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#B79A5B]/20 hover:border-[#B79A5B]/50 transition text-sm text-[#f0c9e1]"
        title="Changer la langue / Change language"
      >
        <Globe size={16} />
        <span>{language.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-[#0d0810] border border-[#B79A5B]/30 rounded-lg overflow-hidden shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left flex items-center gap-3 transition ${
                language === lang.code
                  ? "bg-[#B79A5B]/20 text-[#B79A5B]"
                  : "text-[#f0c9e1]/70 hover:bg-[#B79A5B]/10"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

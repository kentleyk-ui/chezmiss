import { useCallback } from "react";
import { VALIDATION, ERROR_MESSAGES } from "@/lib/constants";

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function useValidation() {
  const validateUrl = useCallback((url: string): ValidationResult => {
    if (!url) return { isValid: true };
    if (url.length > VALIDATION.MAX_IMAGE_URL_LENGTH) {
      return { isValid: false, error: "URL trop longue" };
    }
    try {
      new URL(url);
      return { isValid: true };
    } catch {
      return { isValid: false, error: "URL invalide" };
    }
  }, []);

  const validateText = useCallback((text: string): ValidationResult => {
    if (!text) return { isValid: true };
    if (text.length > VALIDATION.MAX_TEXT_CONTENT_LENGTH) {
      return { isValid: false, error: `Texte trop long (max ${VALIDATION.MAX_TEXT_CONTENT_LENGTH} caractères)` };
    }
    return { isValid: true };
  }, []);

  const validateNumber = useCallback(
    (num: unknown, min: number = 0, max: number = Infinity): ValidationResult => {
      if (num === null || num === undefined || num === "") return { isValid: true };
      const n = typeof num === "string" ? parseInt(num, 10) : typeof num === "number" ? num : NaN;
      if (isNaN(n) || n < min || n > max) {
        return { isValid: false, error: `Nombre invalide (${min}-${max})` };
      }
      return { isValid: true };
    },
    []
  );

  const sanitizeText = useCallback((text: string): string => {
    return text.replace(/<[^>]*>/g, "").trim();
  }, []);

  const sanitizeUrl = useCallback((url: string): string => {
    return url.trim();
  }, []);

  return {
    validateUrl,
    validateText,
    validateNumber,
    sanitizeText,
    sanitizeUrl,
  };
}

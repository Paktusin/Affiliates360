import i18n, { t as tBase } from "i18next";
import { initReactI18next } from "react-i18next";

const supportedLanguages = new Map<string, string>([
  ["he-IL", "il"],
  ["en-US", "en"],
]);

export const loadLocalization = async () => {
  const currentLanguage =
    localStorage.getItem("lang") ||
    supportedLanguages.get(navigator.language) ||
    "en";

  const resources: Record<string, any> = {};

  supportedLanguages.forEach((lang) => {
    resources[lang] = {
      translation: require(`./i18n/${lang}.json`),
    };
  });

  await i18n.use(initReactI18next).init({
    resources: resources,
    lng: currentLanguage,
    fallbackLng: "en",
  });
};

export const t = tBase as (str: string) => string;

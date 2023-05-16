
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import translationAr from './locals/ar/translation.json';
import translationEn from './locals/en/translation.json';

// Configure i18n
i18n.use(initReactI18next).init({
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if translation not found
    debug: true, // Enable debug mode for development

    // Translations
    resources: {
        en: {
            translation: translationEn, // English translations
        },
        ar: {
            translation: translationAr, // Arabic translations
        },
    },

    // Use a key separator to allow nesting in translation files
    keySeparator: '.',

    // Interpolation options
    interpolation: {
        escapeValue: false, // React already escapes values, so no need to escape again
    },
});

export default i18n;
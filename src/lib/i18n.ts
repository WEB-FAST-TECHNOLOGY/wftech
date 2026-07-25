import fr from '@/locales/fr.json';
import en from '@/locales/en.json';
import zh from '@/locales/zh.json';
import hi from '@/locales/hi.json';
import es from '@/locales/es.json';
import ar from '@/locales/ar.json';
import bn from '@/locales/bn.json';
import pt from '@/locales/pt.json';
import ru from '@/locales/ru.json';
import ja from '@/locales/ja.json';

export type Language = 'fr' | 'en' | 'zh' | 'hi' | 'es' | 'ar' | 'bn' | 'pt' | 'ru' | 'ja';

export const SUPPORTED_LANGUAGES: { code: Language; label: string; nativeLabel: string; flag: string; dir?: 'rtl' }[] = [
  { code: 'fr', label: 'French', nativeLabel: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'zh', label: 'Mandarin Chinese', nativeLabel: '中文', flag: '🇨🇳' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', flag: '🇪🇸' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা', flag: '🇧🇩' },
  { code: 'pt', label: 'Portuguese', nativeLabel: 'Português', flag: '🇵🇹' },
  { code: 'ru', label: 'Russian', nativeLabel: 'Русский', flag: '🇷🇺' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語', flag: '🇯🇵' },
];

const translations: Record<Language, typeof fr> = { fr, en, zh, hi, es, ar, bn, pt, ru, ja };

export function getTranslations(language: Language) {
  return translations[language] ?? translations['fr'];
}

import type { SiteLanguage } from '@/types/product';

export const SITE_LANGUAGE_OPTIONS = [
  { value: 'ja', label: '日文' },
  { value: 'en', label: '英文' },
  { value: 'zh', label: '中文' },
] as const;

export function isSiteLanguage(value: string | undefined | null): value is SiteLanguage {
  return value === 'ja' || value === 'en' || value === 'zh';
}

export function normalizeSiteLanguage(
  value?: string | null,
  market?: string | null,
): SiteLanguage {
  if (isSiteLanguage(value)) {
    return value;
  }

  if (market === 'JP') {
    return 'ja';
  }

  return 'en';
}

export function selectSiteCopy<T>(
  language: SiteLanguage,
  copy: {
    ja: T;
    en: T;
    zh: T;
  },
): T {
  if (language === 'ja') {
    return copy.ja;
  }

  if (language === 'zh') {
    return copy.zh;
  }

  return copy.en;
}

export function createSiteTranslator(language: SiteLanguage) {
  return (ja: string, en: string, zh: string) =>
    selectSiteCopy(language, { ja, en, zh });
}

export function getSiteLocale(language: SiteLanguage): string {
  if (language === 'ja') {
    return 'ja_JP';
  }

  if (language === 'zh') {
    return 'zh_CN';
  }

  return 'en_US';
}

export function getSiteLangTag(language: SiteLanguage): string {
  if (language === 'zh') {
    return 'zh-CN';
  }

  return language;
}

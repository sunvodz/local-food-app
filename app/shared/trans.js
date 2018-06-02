import en from '../languages/en';
import sv from '../languages/sv';

export default function trans(string, lang) {
  let currentLang = en;

  if (lang === 'sv') {
    currentLang = sv;
  }

  return currentLang[string] ? currentLang[string] : string;
}
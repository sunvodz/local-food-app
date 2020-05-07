import sv from '../languages/sv';

export default function trans(string, lang) {
  // Useful for wrapping translatable strings in some places before
  // we know selected lang
  if (!lang) {
    return string;
  }

  let currentLang = {};

  if (lang === 'sv') {
    currentLang = sv;
  }

  let key = string.replace(/[^\w\s!?]/g, ' ');
  key = key.replace(/  +/g, ' ');
  key = key.trim();
  key = key.replace(/ /g, '_');
  key = key.toLowerCase();

  return currentLang[key] ? currentLang[key] : string;
}
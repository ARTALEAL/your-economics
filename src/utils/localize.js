import store from '@/store';
import ru from '@/locales/ru';
import en from '@/locales/en';

const locales = {
  'ru-RU': ru,
  'en-US': en,
};
export default function localize(key) {
  const locale = store.getters.info.locale || 'ru-RU';
  return locales[locale][key] || `[localize error]: key ${key} not found`;
}

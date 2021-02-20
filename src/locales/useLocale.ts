/**
 * Multi-language related operations
 */
import type { LocaleType } from '/@/locales/types';
import type { Ref } from 'vue';

import { unref, ref } from 'vue';
import { useLocaleSetting } from '/@/hooks/setting/useLocaleSetting';

import { i18n } from './setupI18n';

import 'dayjs/locale/zh-cn';

const elConfigLocaleRef = ref<any>(null);

export function useLocale() {
  const { getLang, getLocale, setLocale: setLocalSetting } = useLocaleSetting();

  // Switching the language will change the locale of useI18n
  // And submit to configuration modification
  function changeLocale(lang: LocaleType): void {
    if (i18n.mode === 'legacy') {
      i18n.global.locale = lang;
    } else {
      ((i18n.global.locale as unknown) as Ref<string>).value = lang;
    }
    setLocalSetting({ lang });
    // i18n.global.setLocaleMessage(locale, messages);

    switch (lang) {
      // Simplified Chinese
      case 'zh_CN':
        import('element-plus/lib/locale/lang/zh-cn').then((locale) => {
          elConfigLocaleRef.value = locale.default;
        });

        break;
      // English
      case 'en':
        import('element-plus/lib/locale/lang/en').then((locale) => {
          elConfigLocaleRef.value = locale.default;
        });
        break;

      // other
      default:
        break;
    }
  }

  // initialization
  function setLocale() {
    const lang = unref(getLang);
    lang && changeLocale(lang);
  }

  return {
    setLocale,
    getLocale,
    getLang,
    changeLocale,
    elConfigLocale: elConfigLocaleRef,
  };
}

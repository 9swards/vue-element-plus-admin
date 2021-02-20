import { computed, unref } from 'vue';

import { useAppStore } from '/@/store/modules/app';
import type { LocaleSetting } from '/@/types/config';
import getProjectSetting from '/@/settings/projectSetting';
import { localeList } from '/@/locales/constant';

const { getters, commit } = useAppStore();
// Get locale configuration
const getLocale = computed(() => getters.getProjectConfig.locale || getProjectSetting.locale);

// get current language
const getLang = computed(() => unref(getLocale).lang);

// get Available Locales
const getAvailableLocales = computed((): string[] => unref(getLocale).availableLocales);

// get Fallback Locales
const getFallbackLocale = computed((): string => unref(getLocale).fallback);

const getShowLocale = computed(() => unref(getLocale).show);

// Set locale configuration
function setLocale(locale: Partial<LocaleSetting>): void {
  commit('commitProjectConfigState', { locale });
}

export function useLocaleSetting() {
  return {
    getLocale,
    getLang,
    localeList,
    setLocale,
    getShowLocale,
    getAvailableLocales,
    getFallbackLocale,
  };
}

import { defineStore } from "pinia";
import { ref, watch } from "vue";

const THEME_KEY = "theme_qstore";

type Theme = 'light' | 'dark';

export const useThemeStore = defineStore('theme', () => {
  const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
  const theme = ref<Theme>(storedTheme ?? 'light');

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme.value);
    localStorage.setItem(THEME_KEY, theme.value);
  }

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  }

  watch(theme, applyTheme, { immediate: true })

  return { theme, toggleTheme }
})

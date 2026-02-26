export type SiteTheme = 'dark' | 'light'
export const SITE_THEME: SiteTheme =
  process.env.NEXT_PUBLIC_SITE_THEME === 'light' ? 'light' : 'dark'

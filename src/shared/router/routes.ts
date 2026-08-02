export const routes = {
  main: '/',
  login: '/login',
  register: '/register',
  activate: '/activate',
  help: '/help',
  privacy: '/privacy',
  terms: '/terms',
  cookiePolicy: '/cookie-policy',
  pdnConsent: '/pdn-consent',
  groups: '/groups',
  lessons: '/lessons',
  profile: '/profile',
  students: '/students',
  qa: '/qa',
  adminMetrics: '/admin/metrics',
  confirmPasswordChange: '/confirm-password-change',
  resetPassword: '/reset-password',
} as const;

export type AppRoutes = (typeof routes)[keyof typeof routes];

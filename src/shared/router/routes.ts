export const routes = {
  main: '/',
  login: '/login',
  register: '/register',
  activate: '/activate',
  help: '/help',
  groups: '/groups',
  lessons: '/lessons',
  profile: '/profile',
  students: '/students',
  qa: '/qa',
  adminMetrics: '/admin/metrics',
  confirmPasswordChange: '/confirm-password-change',
} as const;

export type AppRoutes = (typeof routes)[keyof typeof routes];

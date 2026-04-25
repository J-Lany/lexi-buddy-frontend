export const routes = {
  main: '/',
  login: '/login',
  register: '/register',
  activate: '/activate',
  groups: '/groups',
  lessons: '/lessons',
  profile: '/profile',
  students: '/students',
  qa: '/qa',
} as const;

export type AppRoutes = (typeof routes)[keyof typeof routes];

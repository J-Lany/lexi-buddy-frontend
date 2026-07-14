import { AppRoutes, routes } from '@/shared/router/routes';

export const routeAccess: Record<'public' | 'private', readonly AppRoutes[]> = {
  public: [
    routes.main,
    routes.login,
    routes.register,
    routes.activate,
    routes.help,
    routes.confirmPasswordChange,
    routes.privacy,
    routes.terms,
    routes.cookiePolicy,
    routes.pdnConsent,
  ],
  private: [routes.groups, routes.lessons, routes.profile, routes.students, routes.qa],
} as const;

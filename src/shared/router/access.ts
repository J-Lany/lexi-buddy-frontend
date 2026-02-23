import { AppRoutes, routes } from '@/shared/router/routes';

export const routeAccess: Record<'public' | 'private', readonly AppRoutes[]> = {
  public: [routes.login, routes.register, routes.activate],
  private: [routes.groups, routes.lessons, routes.profile, routes.students, routes.qa],
} as const;

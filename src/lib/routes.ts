export enum EAppRoutes {
  LOGIN = '/login',
  REGISTRATION = '/register',
  GROUPS = '/groups',
  LESSONS = '/lessons',
  PROFILE = '/profile',
  STUDENTS = '/students',
}

export const RouteAccess = {
  public: [EAppRoutes.LOGIN, EAppRoutes.REGISTRATION],
  private: [EAppRoutes.GROUPS, EAppRoutes.LESSONS, EAppRoutes.PROFILE, EAppRoutes.STUDENTS],
};

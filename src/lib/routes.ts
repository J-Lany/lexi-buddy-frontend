export enum EAppRoutes {
  LOGIN = '/login',
  REGISTRATION = '/register',
  GROUPS = '/groups',
  LESSONS = '/lessons',
  PROFILE = '/profile',
  STUDENTS = '/students',
  QA = '/qa',
}

export const RouteAccess = {
  public: [EAppRoutes.LOGIN, EAppRoutes.REGISTRATION],
  private: [EAppRoutes.GROUPS, EAppRoutes.LESSONS, EAppRoutes.PROFILE, EAppRoutes.STUDENTS],
};

export const RoutesLabels = [
  { label: 'Students', href: EAppRoutes.STUDENTS },
  { label: 'Lessons', href: EAppRoutes.LESSONS },
  { label: 'Settings', href: EAppRoutes.PROFILE },
  { label: 'Q&A', href: EAppRoutes.QA },
];

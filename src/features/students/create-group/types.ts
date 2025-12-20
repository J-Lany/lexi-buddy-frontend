export type Student = {
  id: number;
  name: string;
  username: string;
  groupName: string;
  level: string;
};

export type CreateGroupDraft = {
  name: string;
  level: string;
  description: string;
  studentIds: number[];
};

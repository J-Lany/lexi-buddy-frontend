export type Student = {
  id: string;
  name: string;
  username: string;
  groupName: string;
  level: string;
};

export type CreateGroupDraft = {
  name: string;
  level: string;
  description: string;
  studentIds: string[];
};

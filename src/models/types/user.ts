export enum UserRoles {
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export type User = {
  id: number;
  email: string;
  roles: UserRoles;
  name: string;
  username: string;
};

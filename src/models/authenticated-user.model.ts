import { UserRoleEnum } from "./user-role.enum";

export interface AuthenticatedUserModel {
  id: number;
  username: string;
  role: UserRoleEnum;
}
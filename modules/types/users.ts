export interface IUsers {
  id: number;
  email: string;
  provider: string;
  socialId: string | null;
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  photo: IUserPhoto | null;
  role: IUserRole;
  status: IUserStatus;
  __entity: string;
}

export interface IUserPhoto {
  id: string;
  path: string;
  __entity: string;
}
export interface IUserRole {
  id: number;
  name: string;
  __entity: string;
}
export interface IUserStatus {
  id: number;
  name: string;
  __entity: string;
}

import { ROLES } from 'utils/constants';

const tupleRoles = ['user', 'moderator', 'admin'] as const;
export type TRoleKey = typeof tupleRoles[number];

export type TRoles = TupleToObject<typeof tupleRoles, 'role_'>;
export type TRolesValues = TRoles[TRoleKey];

type TUser = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  userName: string;
  image: string;
  roles: TRolesValues[];
};

// prettier-ignore
export type TUserDB = Readonly<Merge<{
  _type: string;
} & TUser>>;

// prettier-ignore
export type TUserToken = Readonly<Merge<{
  iat: number;
  exp: number;
} & TUser>>;

export type TUserGoogle = {
  name: string;
  sub: string;
  picture: string;
};

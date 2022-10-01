import { FunctionComponent, ImgHTMLAttributes, PropsWithChildren } from 'react';
import { NavLinkProps } from 'react-router-dom';

import { ROLES } from './../utils/constants';

export type TSetter<T> = React.Dispatch<React.SetStateAction<T>>;

/****************************
 * CONTEXTS                 *
 ****************************/
export interface IUserContext {
  user: TUser | null | undefined;
  setUser: TSetter<TUser | null | undefined>;
  encode: (data: TUser) => string;
  login: (data: TUserDB) => void;
}

export interface ISearchContext {
  searchTerm: string;
  setSearchTerm: TSetter<string>;
  debouncedSearchTerm: string;
}

/****************************
 * DATA                     *
 ****************************/

export type TPinData = {
  _id: number;
  category: string;
};

export type TCategorieData = {
  name: string;
  image: string;
};

/****************************
 * PROPS                    *
 ****************************/
export type DialogProps = {
  open: boolean;
  onClose: () => void;
};
export type DialogType = FunctionComponent<PropsWithChildren<DialogProps>>;

export type ConfirmProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  onConfirm: () => void;
};
export type ConfirmType = FunctionComponent<PropsWithChildren<ConfirmProps>>;

export type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
export type ButtonType = FunctionComponent<PropsWithChildren<ButtonProps>>;

export type SpinnerProps = {
  message?: string;
};
export type SpinnerType = FunctionComponent<SpinnerProps>;

export type UserImageType = FunctionComponent<
  ImgHTMLAttributes<HTMLImageElement>
>;

export type MasonryLayoutProps = {
  pins: TPin[];
  setPins: TSetter<TPin[]>;
};
export type MasonryLayoutType = FunctionComponent<MasonryLayoutProps>;

export type NavLinkMenuProps = {
  className?: string;
  activeClassName?: string;
  removeFocusOnClick?: boolean;
} & NavLinkProps;
export type NavLinkMenuType = FunctionComponent<NavLinkMenuProps>;

export type PinProps = {
  pin: TPin;
  setPins: TSetter<TPin[]>;
};
export type PinType = FunctionComponent<PinProps>;

export type UserProfileButtonProps = {
  label: string;
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
export type UserProfileButtonType = FunctionComponent<UserProfileButtonProps>;

export type SidebarProps = {
  closeToggle: () => void;
};
export type SidebarType = FunctionComponent<SidebarProps>;

/****************************
 * USER                     *
 ****************************/

const rolesKey = ['user', 'moderator', 'admin'] as const;
export type TRoleKey = typeof rolesKey[number];
const rolesLabel = Object.values(ROLES);
export type TRoleLabel = typeof rolesLabel[number];

export type TUserDB = {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  userName: string;
  image: string;
  roles: TRoleLabel[];
};

export type TUser = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  userName: string;
  image: string;
  roles: TRoleLabel[];
  iat: number;
  exp: number;
};

export type TUserGoogle = {
  name: string;
  sub: string;
  picture: string;
};

/****************************
 * PIN                      *
 ****************************/
export type TImage = {
  _id: string;
  url: string;
  // assetId: string;
  // extension: string,
};
export type TPostedBy = {
  _id: string;
  _ref: string;
  userName: string;
  image: string;
};
export type TSave = {
  postedBy: TPostedBy;
};
export type TComment = {
  postedBy: TPostedBy;
  comment: string;
};
export type TPin = {
  _id: string;
  postedBy: TPostedBy;
  image: {
    asset: {
      url: string;
    };
  };
  destination: string;
  save: TSave[];
  title: string;
  about: string;
  comments: TComment[];
};

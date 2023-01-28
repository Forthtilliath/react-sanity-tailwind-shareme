import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  PropsWithChildren,
} from 'react';
import { NavLinkProps } from 'react-router-dom';

import { TPin } from './pin';
import { TUser, TUserDB } from './user';

export * from './lib';
export * from './pin';
export * from './user';
export * from './queries';

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

// export type UserImageType = FunctionComponent<
//   ImgHTMLAttributes<HTMLImageElement>
//   >;
export type UserImageType = FunctionComponent<ComponentPropsWithoutRef<'img'>>;

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

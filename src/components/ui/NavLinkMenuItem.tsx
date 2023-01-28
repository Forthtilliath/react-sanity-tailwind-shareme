import { MouseEvent, MutableRefObject, useRef } from 'react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { NavLinkMenuType } from '../../@types';
import { useRouter } from '../../utils/hooks/useRouter';

/**
 * NavLink with fonctional active state. Mostly usefull on links to parent routes (cf '/')
 * @property **className** Classes of the NavLink
 * @property **activeClassName** Classes to add to the NavLink when the link is active
 */
const NavLinkMenuItem: NavLinkMenuType = ({
  className: defaultClassName = '',
  activeClassName = '',
  to,
  children,
  onClick: cb = () => {},
  removeFocusOnClick = false,
  ...otherProps
}) => {
  // let { pathname } = useRouter();
  let pathname = '/';
  const aRef = useRef<HTMLAnchorElement>(null);

  if (!to) {
    throw new Error('You must have `to` property');
  }

  const isActive = to === pathname;

  const className = isActive
    ? twMerge(defaultClassName, activeClassName)
    : defaultClassName;

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    removeFocusOnClick && aRef?.current?.blur();
    cb(e);
  };

  return (
    <NavLink
      ref={aRef}
      to={to}
      onClick={onClick}
      className={className}
      {...otherProps}>
      {children}
    </NavLink>
  );
};

export default NavLinkMenuItem;

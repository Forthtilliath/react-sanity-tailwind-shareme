import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { useRouter } from '../utils/hooks/useRouter';

/**
 * NavLink with fonctional active state. Mostly usefull on links to parent routes (cf '/')
 * @property **className** Classes of the NavLink
 * @property **activeClassName** Classes to add to the NavLink when the link is active
 */
const NavLinkMenu = ({
  className: defaultClassName = '',
  activeClassName = '',
  to,
  children,
  onClick: cb = () => {},
  removeFocusOnClick = false,
  ...otherProps
}) => {
  let { pathname } = useRouter();
  const aRef = useRef();

  if (!to) {
    throw new Error('to must have `to` property');
  }

  const isActive = to === pathname;

  const className = isActive
    ? twMerge(defaultClassName, activeClassName)
    : defaultClassName;

  /**
   * If ``removeFocusOnClick`` is true, then remove focus from the link element, and then call the
   * cb function.
   */
  const onClick = () => {
    removeFocusOnClick && aRef.current.blur();
    cb();
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

export default NavLinkMenu;

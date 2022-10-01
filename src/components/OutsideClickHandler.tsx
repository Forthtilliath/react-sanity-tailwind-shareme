import React from 'react';
import { createRef, useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  onOutsideClick: () => void;
};

const OutsideClickHandler = ({
  onOutsideClick = () => {},
  children,
  className,
}: Props) => {
  const wrapperRef = createRef<HTMLDivElement>();

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current === event.target) {
      onOutsideClick();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
};

export default OutsideClickHandler;

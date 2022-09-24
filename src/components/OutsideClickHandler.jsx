import { createRef, useEffect } from 'react';

const OutsideClickHandler = ({
  onOutsideClick = () => {},
  children,
  className,
}) => {
  const wrapperRef = createRef();

  const handleClickOutside = (event) => {
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

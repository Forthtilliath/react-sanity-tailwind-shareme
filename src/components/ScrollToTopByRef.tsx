import React, { useEffect, useState } from 'react';

type ScrollToTopProps = React.ComponentPropsWithoutRef<'button'> & {
  top?: number;
  smooth?: boolean;
  svgPath?: string;
  viewBox?: string;
  component?: any;
  width?: string;
  height?: string;
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
};

const ScrollToTop: React.FunctionComponent<ScrollToTopProps> = ({
  top = 20,
  className = '',
  color = 'black',
  smooth = false,
  component = '',
  viewBox = '0 0 256 256',
  svgPath = 'M222.138,91.475l-89.6-89.6c-2.5-2.5-6.551-2.5-9.051,0l-89.6,89.6c-2.5,2.5-2.5,6.551,0,9.051s6.744,2.5,9.244,0L122,21.85  V249.6c0,3.535,2.466,6.4,6,6.4s6-2.865,6-6.4V21.85l78.881,78.676c1.25,1.25,2.992,1.875,4.629,1.875s3.326-0.625,4.576-1.875  C224.586,98.025,224.638,93.975,222.138,91.475z',
  width = '28',
  height = '28',
  scrollRef,
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  function scrollToTop(smooth: boolean = false) {
    if (!scrollRef?.current) {
      return;
    }
    if (smooth) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      scrollRef.current.scrollTop = 0;
    }
    setVisible(false);
  }

  useEffect(() => {
    const onScroll = () => {
      // Due of overflow the element to scroll to top, ref was usefull to counter it
      if (scrollRef && scrollRef.current) {
        setVisible(scrollRef.current.scrollTop >= top);
      } else {
        setVisible(document.documentElement.scrollTop >= top);
      }
    };
    onScroll();
    document.addEventListener('mousewheel', onScroll);
    return () => {
      document.removeEventListener('mousewheel', onScroll);
    };
  }, [top]);

  if (!visible) return null;

  return (
    <button
      // className={`scroll-to-top ${className}`}
      className={`bg-white shadow-md shadow-gray-600 right-10 bottom-10 fixed z-40 cursor-pointer rounded-md w-10 h-10 border-none grid place-content-center ${className}`}
      onClick={() => scrollToTop(smooth)}
      aria-label="Scroll to top"
      {...props}>
      {component || (
        <svg width={width} height={height} fill={color} viewBox={viewBox}>
          <path d={svgPath} />
        </svg>
      )}
    </button>
  );
};
export default ScrollToTop;

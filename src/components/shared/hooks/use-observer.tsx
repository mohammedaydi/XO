import { useState, useRef, useEffect } from "react";
import debounce from "lodash/debounce";

interface Options extends IntersectionObserverInit {}

export const useObserver = (options: Options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLElement | undefined>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsIntersecting(true);
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [options]);

  return [elementRef, isIntersecting] as const;
};

import { useState, useEffect, useRef } from "react";

export interface UseBlurTextOptions {
  delay?: number;
  animateBy?: "words" | "letters";
}

export function useBlurText(options: UseBlurTextOptions = {}) {
  const { delay = 50, animateBy = "words" } = options;
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    ref,
    inView,
    delay,
    animateBy,
  };
}

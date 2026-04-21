import React from "react";
import { motion, useInView, Variants } from "motion/react";

interface TimelineContentProps {
  as?: any;
  animationNum?: number;
  timelineRef: React.RefObject<HTMLElement | null>;
  customVariants?: Variants;
  className?: string;
  children: React.ReactNode;
}

export const TimelineContent: React.FC<TimelineContentProps> = ({
  as = "div",
  animationNum = 0,
  timelineRef,
  customVariants,
  className = "",
  children,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(timelineRef, { once: true, amount: 0.2 });

  const MotionComponent = motion.create(as);

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: animationNum * 0.2,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariants || defaultVariants}
      custom={animationNum}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

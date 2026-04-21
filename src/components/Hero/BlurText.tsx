import React from "react";
import { useBlurText } from "../../hooks/useBlurText";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

export const BlurText: React.FC<BlurTextProps> = React.memo(
  ({
    text,
    delay = 50,
    animateBy = "words",
    direction = "top",
    className = "",
    style,
  }) => {
    const { ref, inView } = useBlurText({ delay, animateBy: animateBy as "words" | "letters" });

    const segments =
      animateBy === "words" ? text.split(" ") : text.split("");

    return (
      <p
        ref={ref}
        className={`inline-flex flex-wrap ${className}`}
        style={style}
      >
        {segments.map((segment, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              filter: inView ? "blur(0px)" : "blur(10px)",
              opacity: inView ? 1 : 0,
              transform: inView
                ? "translateY(0)"
                : `translateY(${direction === "top" ? "-20px" : "20px"})`,
              transition: `all 0.5s ease-out ${i * delay}ms`,
            }}
          >
            {segment}
            {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </p>
    );
  }
);

BlurText.displayName = "BlurText";

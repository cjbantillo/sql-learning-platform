import type { ReactNode, CSSProperties, MouseEvent } from "react";

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  onMouseEnter?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function Card({
  children,
  style,
  className = "",
  onMouseEnter,
  onMouseLeave,
  onClick,
}: CardProps) {
  return (
    <div
      className={`card ${className}`}
      style={{
        background: "white",
        borderRadius: "14px",
        padding: "22px",
        boxShadow: "0 6px 20px rgba(21, 21, 21, 0.06)",
        ...style,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

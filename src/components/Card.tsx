import type { ReactNode, CSSProperties } from "react";

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export default function Card({ children, style, className = "" }: CardProps) {
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
    >
      {children}
    </div>
  );
}

import type { ReactNode, CSSProperties } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "accent" | "default";
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = "default",
  type = "button",
  style,
  className = "",
}: ButtonProps) {
  const baseStyles: CSSProperties = {
    padding: "12px 18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
  };

  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      background: "var(--csu-green)",
      color: "white",
    },
    accent: {
      background: "var(--csu-gold)",
      color: "var(--charcoal)",
    },
    default: {
      background: "var(--light)",
      color: "var(--text)",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}

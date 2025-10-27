import type { ReactNode, CSSProperties } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "accent" | "default";
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export default function Button({
  children,
  onClick,
  variant = "default",
  type = "button",
  style,
  className = "",
  icon,
  iconPosition = "left",
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: icon ? "8px" : "0",
      }}
    >
      {icon && iconPosition === "left" && (
        <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
      )}
    </button>
  );
}

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  onModalOpen: (modalName: string) => void;
}

export default function Header({ onModalOpen }: HeaderProps) {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    // Load dark mode preference from localStorage
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  // Apply dark mode on mount
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDark]);

  const toggleDark = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("darkMode", String(newIsDark));

    if (newIsDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  return (
    <header
      style={{
        background: "var(--csu-green)",
        color: "white",
        padding: "18px 28px",
        display: "flex",
        alignItems: "center",
        gap: "18px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <img
            src="/mnt/data/aedbe48d-2b02-4713-93d7-020c86fae303.png"
            alt="CSU Logo"
            style={{
              height: "56px",
              width: "auto",
              borderRadius: "8px",
              background: "white",
              padding: "4px",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: "18px" }}>
              CSU Digital Academy
            </div>
            <div
              style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.9)" }}
            >
              Interactive SQL Learning
            </div>
          </div>
        </Link>
      </div>

      <nav
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            background:
              location.pathname === "/"
                ? "rgba(255, 255, 255, 0.15)"
                : "transparent",
            border: "none",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Home
        </Link>
        <Link
          to="/lessons"
          style={{
            background: location.pathname.startsWith("/lessons")
              ? "rgba(255, 255, 255, 0.15)"
              : "transparent",
            border: "none",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Lessons
        </Link>
        <button
          onClick={() => onModalOpen("about")}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        >
          About
        </button>
        <button
          onClick={() => onModalOpen("achievements")}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        >
          Achievements
        </button>
        <button
          onClick={() => onModalOpen("contact")}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        >
          Contact
        </button>
        <button
          onClick={() => onModalOpen("socials")}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        >
          Socials
        </button>
        <button
          onClick={toggleDark}
          style={{
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            padding: "6px 10px",
            borderRadius: "8px",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Toggle Dark
        </button>
      </nav>
    </header>
  );
}

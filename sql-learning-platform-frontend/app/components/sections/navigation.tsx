"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Code,
  LogIn,
  Info,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    router.push("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    // { href: "/lessons", label: "Lessons", icon: BookOpen },
    { href: "/practice", label: "Practice SQL", icon: Code },
    // { href: "/ai-query", label: "AI Query", icon: Sparkles },
    { href: "/about", label: "About", icon: Info },
    isAuthenticated
      ? { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }
      : { href: "/sign-in", label: "Sign In", icon: LogIn },
  ];

  return (
    <nav className="bg-[#1B5E20] text-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-wide hover:opacity-90 transition"
          >
            CSU Digital Academy
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-[#164A16] transition focus:outline-none focus:ring-2 focus:ring-white/20"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-2 text-base font-medium items-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 hover:bg-[#164A16] px-4 py-2 rounded-lg transition"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
            {isAuthenticated && (
              <li>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 hover:bg-red-600 bg-red-700 px-4 py-2 rounded-lg transition"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <ul className="md:hidden mt-4 flex flex-col gap-2 text-base">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 hover:bg-[#164A16] px-4 py-3 rounded-lg transition"
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
            {isAuthenticated && (
              <li>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 hover:bg-red-600 bg-red-700 px-4 py-3 rounded-lg transition"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}

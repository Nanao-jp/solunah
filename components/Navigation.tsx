"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBusinessMenuOpen, setIsBusinessMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "ニュース", href: "/news" },
    { name: "会社情報", href: "/company" },
    { name: "お問い合わせ", href: "/contact" },
  ];

  const businessMenuItems = [
    { name: "YOUR NURSE（保険外看護）", href: "/your-nurse" },
    { name: "保険内介護", href: "/insurance-nursing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="text-2xl font-semibold text-slate-900 tracking-wide hover:text-orange-600 transition-colors"
          >
            SOLUNAH
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home Link - First */}
            <Link
              href="/"
              className="text-sm text-slate-700 font-medium tracking-wide hover:text-orange-600 transition-colors uppercase"
            >
              ホーム
            </Link>

            {/* Business Menu Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsBusinessMenuOpen(true)}
              onMouseLeave={() => setIsBusinessMenuOpen(false)}
            >
              <button className="text-sm text-slate-700 font-medium tracking-wide hover:text-orange-600 transition-colors uppercase flex items-center gap-1">
                事業紹介
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isBusinessMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isBusinessMenuOpen && (
                <div 
                  className="absolute top-full left-0 pt-2 w-64"
                  onMouseEnter={() => setIsBusinessMenuOpen(true)}
                  onMouseLeave={() => setIsBusinessMenuOpen(false)}
                >
                  <div className="bg-white/95 backdrop-blur-xl rounded-lg shadow-lg border border-slate-200/50 overflow-hidden">
                    {businessMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-sm text-slate-700 font-medium tracking-wide hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-slate-700 font-medium tracking-wide hover:text-orange-600 transition-colors uppercase"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニュー"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <span
                className={`block h-0.5 w-6 bg-slate-700 transition-all ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-slate-700 transition-all ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-slate-700 transition-all ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/50">
          <div className="px-4 py-4 space-y-4">
            {/* Home Link - First */}
            <Link
              href="/"
              className="block text-sm text-slate-700 font-medium py-2 tracking-wide hover:text-orange-600 transition-colors uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ホーム
            </Link>

            {/* Business Menu for Mobile */}
            <div>
              <button
                className="block w-full text-left text-sm text-slate-700 font-medium py-2 tracking-wide hover:text-orange-600 transition-colors uppercase flex items-center justify-between"
                onClick={() => setIsBusinessMenuOpen(!isBusinessMenuOpen)}
              >
                <span>事業紹介</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isBusinessMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isBusinessMenuOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {businessMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-sm text-slate-600 font-medium py-2 tracking-wide hover:text-orange-600 transition-colors"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsBusinessMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-sm text-slate-700 font-medium py-2 tracking-wide hover:text-orange-600 transition-colors uppercase"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

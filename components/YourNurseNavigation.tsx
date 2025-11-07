"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function YourNurseNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSiteSwitcherOpen, setIsSiteSwitcherOpen] = useState(false);
  const pathname = usePathname();
  const siteSwitcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ウィンドウ外タップで事業切り替えメニューを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (siteSwitcherRef.current && !siteSwitcherRef.current.contains(event.target as Node)) {
        setIsSiteSwitcherOpen(false);
      }
    };

    if (isSiteSwitcherOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSiteSwitcherOpen]);

  const navItems = [
    { name: "ホーム", href: "/your-nurse" },
    { name: "サービス", href: "/your-nurse/services" },
    { name: "特徴", href: "/your-nurse/features" },
    { name: "料金", href: "/your-nurse/pricing" },
    { name: "お問い合わせ", href: "/your-nurse/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/your-nurse") {
      return pathname === "/your-nurse";
    }
    return pathname?.startsWith(href);
  };

  const isCurrentSite = (path: string) => {
    if (path === "/your-nurse") {
      return pathname?.startsWith("/your-nurse");
    }
    if (path === "/") {
      return !pathname?.startsWith("/your-nurse") && !pathname?.startsWith("/insurance-nursing");
    }
    return pathname?.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-orange-200/50 border-b border-orange-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Site Switcher - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 text-sm font-semibold tracking-wide transition-colors rounded-lg ${
                isCurrentSite("/")
                  ? "text-slate-900 bg-orange-50"
                  : "text-slate-700 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              SOLUNAH
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/your-nurse"
              className={`px-4 py-2 text-sm font-semibold tracking-wide transition-colors rounded-lg ${
                isCurrentSite("/your-nurse")
                  ? "text-orange-600 bg-orange-50"
                  : "text-slate-700 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              YOUR NURSE
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/insurance-nursing"
              className={`px-4 py-2 text-sm font-semibold tracking-wide transition-colors rounded-lg ${
                isCurrentSite("/insurance-nursing")
                  ? "text-orange-600 bg-orange-50"
                  : "text-slate-700 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              保険内介護
            </Link>
          </div>

          {/* Mobile Site Switcher - 左側に配置 */}
          <div className="md:hidden">
            <div className="relative" ref={siteSwitcherRef}>
              <button
                onClick={() => setIsSiteSwitcherOpen(!isSiteSwitcherOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-orange-600 transition-colors"
              >
                <span>YOUR NURSE</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isSiteSwitcherOpen ? "rotate-180" : ""
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
              
              {/* 事業切り替えドロップダウン */}
              {isSiteSwitcherOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-orange-200 overflow-hidden z-50">
                  <Link
                    href="/"
                    className={`block px-4 py-3 text-sm font-semibold transition-colors ${
                      isCurrentSite("/")
                        ? "text-slate-900 bg-orange-50"
                        : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                    onClick={() => {
                      setIsSiteSwitcherOpen(false);
                    }}
                  >
                    SOLUNAH
                  </Link>
                  <Link
                    href="/your-nurse"
                    className={`block px-4 py-3 text-sm font-semibold transition-colors ${
                      isCurrentSite("/your-nurse")
                        ? "text-orange-600 bg-orange-50"
                        : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                    onClick={() => {
                      setIsSiteSwitcherOpen(false);
                    }}
                  >
                    YOUR NURSE
                  </Link>
                  <Link
                    href="/insurance-nursing"
                    className={`block px-4 py-3 text-sm font-semibold transition-colors ${
                      isCurrentSite("/insurance-nursing")
                        ? "text-orange-600 bg-orange-50"
                        : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                    onClick={() => {
                      setIsSiteSwitcherOpen(false);
                    }}
                  >
                    保険内介護
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 ml-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors px-3 py-2 rounded-lg ${
                  isActive(item.href)
                    ? "text-orange-600 bg-orange-50"
                    : "text-slate-700 hover:text-orange-600 hover:bg-orange-50/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button - 右側に配置 */}
          <button
            className="md:hidden p-2 ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニュー"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <span
                className={`block h-0.5 w-6 bg-slate-700 transition-all origin-center ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-slate-700 transition-all ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-slate-700 transition-all origin-center ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu - ページのみ */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-orange-200/50">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "text-orange-600 bg-orange-50"
                    : "text-slate-700 hover:text-orange-600 hover:bg-orange-50/50"
                }`}
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


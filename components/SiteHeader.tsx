'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from 'motion/react';
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right';
import Menu from 'lucide-react/dist/esm/icons/menu';
import X from 'lucide-react/dist/esm/icons/x';

interface SiteHeaderProps {
  registrationUrl: string;
  instagramUrl: string;
  unstopUrl?: string;
}

const NAV_LINKS = [
  { href: '#about', label: 'About', accent: '#1F4FE0' },
  { href: '#build', label: 'Build', accent: '#F5A623' },
  { href: '#schedule', label: 'Schedule', accent: '#1FAA59' },
  { href: '#faq', label: 'FAQ', accent: '#E8392D' },
  { href: '#contact', label: 'Contact', accent: '#111111' },
];

function hasValidUrl(value?: string) {
  return Boolean(
    value && value.trim().length > 0 && !value.trim().startsWith('[')
  );
}

export function SiteHeader({
  registrationUrl,
  instagramUrl,
  unstopUrl = 'https://unstop.com/o/VLHnABy?lb=QpoGU3DZ',
}: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const wasOpenRef = useRef(false);

  const hasReg = hasValidUrl(registrationUrl);

  // Lock page scroll while mobile menu is open & manage focus transitions
  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Move focus into the menu when it opens
      const timer = window.setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 10);

      return () => {
        window.clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
      };
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      // Return focus to the hamburger button when menu closes
      toggleBtnRef.current?.focus();
    }
  }, [isOpen]);

  // Close on Escape key, outside click/tap, or viewport resize to desktop (>= 768px)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
      }
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        headerRef.current &&
        event.target instanceof Node &&
        !headerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, {
      passive: true,
    });
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 w-full bg-[#F4F0E6] border-b border-[#111111]"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 min-h-14 py-1.5 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
          {/* Zone 1: Brand Title — "Build with AI" on mobile & compact tablet, full title on large screens */}
          <a
            href="#top"
            onClick={() => setIsOpen(false)}
            className="font-display text-sm sm:text-base tracking-tight text-[#111111] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F4FE0]"
          >
            <span className="xl:hidden">Build with AI</span>
            <span className="hidden xl:inline">
              Build with AI: Anybody Can Code
            </span>
          </a>

          {/* Zone 2: Desktop single-line navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium text-[#111111]"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{ textDecorationColor: link.accent }}
                className="hover:underline underline-offset-4 decoration-2 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1F4FE0]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Group: "Powered by [Unstop logo]" lockup + Desktop CTA / Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">
            {/* "Powered by [Unstop logo]" lockup (>=80px wide with clear space, unaltered, linking to Unstop) */}
            <a
              href={unstopUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Powered by Unstop"
              className="inline-flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 text-[#111111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F4FE0] shrink-0"
            >
              <span className="font-body text-[10px] sm:text-xs font-medium text-[#111111] whitespace-nowrap leading-none">
                Powered by
              </span>
              <span className="header-unstop-tile">
                <Image
                  src="/assets/aistudio/Unstop-Logo-Blue_4bf8af3f.svg"
                  alt="Unstop logo"
                  width={2000}
                  height={796}
                  loading="lazy"
                  sizes="80px"
                  referrerPolicy="no-referrer"
                  className="header-unstop-logo-img"
                />
              </span>
            </a>

            {/* Zone 3 (Desktop only): Registration button linking to Unstop */}
            <div className="hidden md:flex items-center shrink-0">
              {!hasReg ? (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border border-[#111111]/50 bg-[#F4F0E6] text-[#111111]/70 font-body font-medium text-xs sm:text-sm cursor-not-allowed select-none whitespace-nowrap shrink-0"
                >
                  <span className="inline-block w-2 h-2 bg-[#F5A623] border border-[#111111] shrink-0" />
                  <span>Registration opens soon</span>
                </button>
              ) : (
                <a
                  href={registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 border border-[#111111] bg-[#F4F0E6] hover:bg-[#F5A623] text-[#111111] transition-colors duration-150 font-body font-semibold text-xs sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F4FE0] whitespace-nowrap shrink-0"
                >
                  <span>Register now</span>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>

            {/* Zone 3 (Mobile only, < 768px): 44x44px Hamburger button */}
            <button
              ref={toggleBtnRef}
              type="button"
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls="mobile-nav-menu"
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] border-2 border-[#111111] bg-[#F4F0E6] text-[#111111] hover:bg-[#F5A623] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F4FE0] shrink-0"
            >
              {isOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Full-width mobile dropdown panel below the header */}
        <LazyMotion features={domAnimation}>
          <AnimatePresence initial={false}>
            {isOpen && (
              <m.nav
                id="mobile-nav-menu"
                aria-label="Mobile navigation"
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: -6 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0, y: 0 }
                    : { opacity: 0, y: -6 }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.15, ease: 'easeOut' }
                }
                className="md:hidden absolute top-full left-0 right-0 w-full bg-[#F4F0E6] text-[#111111] border-b-2 border-[#111111] z-50"
              >
                <div className="px-4 py-4 flex flex-col">
                  <ul className="divide-y divide-[#111111]/20 border-b border-[#111111]/20">
                    {NAV_LINKS.map((link, idx) => (
                      <li key={link.href}>
                        <a
                          ref={idx === 0 ? firstLinkRef : undefined}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between py-3 px-1 font-body font-bold text-base text-[#111111] hover:text-[#1F4FE0] focus-visible:outline-2 focus-visible:outline-[#1F4FE0]"
                        >
                          <span>{link.label}</span>
                          <span
                            className="w-2.5 h-2.5 border border-[#111111] shrink-0"
                            style={{ backgroundColor: link.accent }}
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>

                  {/* Primary CTA button at the bottom of the mobile menu */}
                  <div className="pt-4">
                    {hasReg ? (
                      <a
                        href={registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 border-2 border-[#111111] bg-[#1F4FE0] text-[#F4F0E6] hover:bg-[#111111] hover:text-[#F5A623] transition-colors duration-150 font-body font-bold text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
                      >
                        <span>Register now</span>
                        <ArrowUpRight
                          className="w-4 h-4 shrink-0"
                          aria-hidden="true"
                        />
                      </a>
                    ) : (
                      <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 border-2 border-[#111111] bg-[#1F4FE0] text-[#F4F0E6] hover:bg-[#111111] hover:text-[#F5A623] transition-colors duration-150 font-body font-bold text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
                      >
                        <span>Follow for updates</span>
                        <ArrowUpRight
                          className="w-4 h-4 shrink-0"
                          aria-hidden="true"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </m.nav>
            )}
          </AnimatePresence>
        </LazyMotion>
      </header>

      {/* Backdrop overlay to catch taps outside the mobile dropdown */}
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 top-14 z-40 bg-[#111111]/25"
        />
      )}
    </>
  );
}

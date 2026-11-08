'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Lightweight one-shot fade-up wrapper (12px offset, runs once, respects prefers-reduced-motion).
 * Used only on section headings and key content blocks rather than entire section containers.
 */
export function FadeUpBlock({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Subtle hover tilt/scale card for the "Who it's for" section, respecting prefers-reduced-motion.
 */
export function WhoItsForCard({
  children,
  rotate = -0.6,
  className = '',
}: {
  children: React.ReactNode;
  rotate?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={
        prefersReducedMotion ? undefined : { y: -4, scale: 1.015, rotate }
      }
      whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.article>
  );
}

/**
 * Optimized Hero artwork image with WebP source, explicit width & height (900x766),
 * decoding="async", and graceful fallback if the image fails to load.
 */
export function HeroArtwork({
  webpSrc,
  fallbackJpgSrc,
  alt,
}: {
  webpSrc: string;
  fallbackJpgSrc: string;
  alt: string;
}) {
  const [artworkError, setArtworkError] = useState(false);

  if (artworkError) {
    return (
      <div
        className="aspect-[6/5] w-full border border-[#111111] bg-[#F4F0E6] p-6 grid grid-cols-6 grid-rows-4 gap-2"
        role="img"
        aria-label="Geometric colour-block artwork in cobalt blue, mustard yellow, green, and red"
      >
        <div className="col-span-3 row-span-2 bg-[#1F4FE0] border border-[#111111]" />
        <div className="col-span-3 row-span-2 bg-[#F5A623] border border-[#111111]" />
        <div className="col-span-2 row-span-2 bg-[#1FAA59] border border-[#111111]" />
        <div className="col-span-2 row-span-2 bg-[#111111]" />
        <div className="col-span-2 row-span-2 bg-[#E8392D] border border-[#111111]" />
      </div>
    );
  }

  return (
    <picture className="block w-full md:h-full">
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={webpSrc || fallbackJpgSrc}
        alt={alt}
        width={900}
        height={766}
        decoding="async"
        fetchPriority="high"
        referrerPolicy="no-referrer"
        onError={() => setArtworkError(true)}
        className="w-full h-44 sm:h-56 md:h-full block border border-[#111111] md:border-0 object-cover object-center"
      />
    </picture>
  );
}

/**
 * Square speaker photo with 3px solid black border (480x480 WebP, no filters or effects),
 * or an initials avatar placeholder when no photo is provided or while awaiting upload.
 */
export function SpeakerAvatar({
  photoSrc,
  alt,
  initials,
  accentBg = '#F5A623',
  accentText = '#111111',
}: {
  photoSrc?: string;
  alt: string;
  initials: string;
  accentBg?: string;
  accentText?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const hasPhoto = Boolean(
    photoSrc && photoSrc.trim().length > 0 && !photoSrc.trim().startsWith('[')
  );

  if (!hasPhoto || imgError) {
    return (
      <div
        className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 border-[3px] border-[#111111] flex items-center justify-center select-none"
        style={{ backgroundColor: accentBg, color: accentText }}
        aria-label={`${alt} avatar placeholder`}
      >
        <span className="font-display text-xl sm:text-2xl uppercase tracking-tight">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 border-[3px] border-[#111111] bg-[#F4F0E6] overflow-hidden">
      <img
        src={photoSrc}
        alt={alt}
        width={480}
        height={480}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className="w-full h-full object-cover object-center block"
      />
    </div>
  );
}

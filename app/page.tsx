// ============================================================================
// CONFIG — Editable object at the top of the code
// ============================================================================
const CONFIG = {
  EVENT_DATE_TEXT:
    "Day 1: Date to be announced | Day 2: Date to be announced",
  EVENT_DATE_ISO: "",
  DAY_1_DATE: "TBA",
  DAY_1_TIME: "Time: TBA",
  DAY_2_DATE: "Date to be announced",
  SCHEDULE_NOTE: "Dates and timings will be announced soon. Follow for updates.",
  VENUE: "BSSRV Campus, Golaghat, Assam (exact hall to be announced)",
  MAP_URL: "https://maps.app.goo.gl/EoRmF95gZaxbuRg86",
  REGISTRATION_URL: "", // If empty, shows disabled "Registration opens soon" button (and "Follow for updates" in Hero); if filled, shows active "Register now" button opening in a new tab
  CONTACT_EMAIL: "roboticsclub.bssrv@gmail.com",
  INSTAGRAM_URL: "https://www.instagram.com/roboticsclub.bssrv/",
  DEPARTMENT_NAME: "Faculty of Engineering & Technology",
  SPEAKERS: [
    {
      name: "[Speaker name]",
      org: "[organisation]",
      topic: "Day 1: guided bootcamp (subject to final confirmation)",
      photo: "",
      initials: "D1",
      linkedin: "",
    },
    {
      name: "Amaan Bhati",
      org: "Keploy",
      topic:
        "Day 2: Open Source & GSoC, virtual session (subject to final confirmation)",
      photo: "/assets/aistudio/amaan-bhati.webp",
      initials: "AB",
      linkedin: "https://www.linkedin.com/in/amaan-bhati/",
    },
  ] as Array<{
    name: string;
    org: string;
    topic: string;
    photo?: string;
    initials?: string;
    linkedin?: string;
  }>,
  PARTNERS: [
    {
      name: "Unstop",
      role: "Platform Partner",
      logo: "/assets/aistudio/Unstop-Logo-Blue_4bf8af3f.svg",
      url: "https://unstop.com/",
    },
    {
      name: "Keploy",
      role: "Community Partner",
      logo: "/assets/aistudio/image_9108c23f.png",
      url: "https://keploy.io/",
    },
  ] as Array<{
    name: string;
    role: string;
    logo: string;
    url?: string;
  }>,
  HERO_ARTWORK_URL: "/assets/aistudio/bssrv-hero-artwork.webp",
  HERO_ARTWORK_FALLBACK_URL: "/assets/aistudio/bssrv-hero-artwork.jpg",
};

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Mail from 'lucide-react/dist/esm/icons/mail';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Share2 from 'lucide-react/dist/esm/icons/share-2';
import { CountdownTimer } from '@/components/CountdownTimer';
import type { FaqItem } from '@/components/FaqAccordion';
import { SiteHeader } from '@/components/SiteHeader';
import {
  FadeUpBlock,
  HeroArtwork,
  SpeakerAvatar,
  WhoItsForCard,
} from '@/components/EventMotion';

const IdeaCardsBlock = dynamic(() =>
  import('@/components/IdeaCardsBlock').then((mod) => mod.IdeaCardsBlock)
);

const FaqAccordion = dynamic(() =>
  import('@/components/FaqAccordion').then((mod) => mod.FaqAccordion)
);

// ============================================================================
// Simplified Section Rule: Single thin colour bar above each section heading
// ============================================================================
function SectionRule({
  index,
  label,
  barColor = '#1F4FE0',
  darkOnDesktop = false,
}: {
  index: string;
  label: string;
  barColor?: string;
  darkOnDesktop?: boolean;
}) {
  return (
    <div className="mb-4 md:mb-6">
      <div
        className="h-1 w-16 mb-2.5"
        style={{ backgroundColor: barColor }}
        aria-hidden="true"
      />
      <span
        className={`font-pixel text-xs tracking-wider uppercase block ${
          darkOnDesktop
            ? 'text-[#111111] md:text-[#F5A623]'
            : 'text-[#111111]'
        }`}
      >
        {index} / {label}
      </span>
    </div>
  );
}

// ============================================================================
// Registration & Hero Action Buttons
// ============================================================================
function hasValidUrl(value?: string) {
  return Boolean(
    value && value.trim().length > 0 && !value.trim().startsWith('[')
  );
}

function HeroPrimaryButton() {
  const hasReg = hasValidUrl(CONFIG.REGISTRATION_URL);

  if (hasReg) {
    return (
      <a
        href={CONFIG.REGISTRATION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 self-start px-6 py-3.5 border-2 border-[#111111] bg-[#1F4FE0] text-[#F4F0E6] hover:bg-[#111111] hover:text-[#F5A623] transition-colors duration-150 font-body font-bold text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] whitespace-nowrap shrink-0"
      >
        <span>Register now</span>
        <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
      </a>
    );
  }

  return (
    <a
      href={CONFIG.INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 self-start px-6 py-3.5 border-2 border-[#111111] bg-[#1F4FE0] text-[#F4F0E6] hover:bg-[#111111] hover:text-[#F5A623] transition-colors duration-150 font-body font-bold text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] whitespace-nowrap shrink-0"
    >
      <span>Follow for updates</span>
      <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
    </a>
  );
}

function RegistrationButton({
  variant = 'primary',
  className = '',
}: {
  variant?: 'header-secondary' | 'primary';
  className?: string;
}) {
  const hasReg = hasValidUrl(CONFIG.REGISTRATION_URL);

  if (variant === 'header-secondary') {
    if (!hasReg) {
      return (
        <button
          type="button"
          disabled
          aria-disabled="true"
          className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border border-[#111111]/50 bg-[#F4F0E6] text-[#111111]/70 font-body font-medium text-xs sm:text-sm cursor-not-allowed select-none whitespace-nowrap shrink-0 ${className}`}
        >
          <span className="inline-block w-2 h-2 bg-[#F5A623] border border-[#111111] shrink-0" />
          <span>Registration opens soon</span>
        </button>
      );
    }

    return (
      <a
        href={CONFIG.REGISTRATION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 border border-[#111111] bg-[#F4F0E6] hover:bg-[#F5A623] text-[#111111] transition-colors duration-150 font-body font-semibold text-xs sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F4FE0] whitespace-nowrap shrink-0 ${className}`}
      >
        <span>Register now</span>
        <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      </a>
    );
  }

  if (!hasReg) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-[#111111] bg-[#E5DFD0] text-[#111111]/80 font-body font-semibold text-sm sm:text-base cursor-not-allowed select-none whitespace-nowrap shrink-0 ${className}`}
      >
        <span className="inline-block w-2.5 h-2.5 bg-[#F5A623] border border-[#111111] shrink-0" />
        <span>Registration opens soon</span>
      </button>
    );
  }

  return (
    <a
      href={CONFIG.REGISTRATION_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-[#111111] bg-[#1F4FE0] text-[#F4F0E6] hover:bg-[#111111] hover:text-[#F5A623] transition-colors duration-150 font-body font-bold text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5A623] whitespace-nowrap shrink-0 ${className}`}
    >
      <span>Register now</span>
      <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
    </a>
  );
}

// ============================================================================
// Unified Chip Component (Black outline on cream + small coloured square)
// ============================================================================
function AccentChip({
  label,
  squareColor,
}: {
  label: string;
  squareColor: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 border border-[#111111] bg-[#F4F0E6] text-[#111111] px-3 py-1.5 text-sm md:text-base font-medium">
      <span
        className="w-2.5 h-2.5 shrink-0 border border-[#111111]"
        style={{ backgroundColor: squareColor }}
        aria-hidden="true"
      />
      <span>{label}</span>
    </span>
  );
}

// ============================================================================
// Static Schedule, Themes, Judging Criteria & FAQ Data
// ============================================================================
const HERO_CHIPS = [
  { label: 'Open to all branches & departments', color: '#1F4FE0' },
  { label: 'Individuals & teams welcome', color: '#F5A623' },
  { label: 'Free entry', color: '#1FAA59' },
  { label: 'Beginners welcome', color: '#E8392D' },
];

const THEME_CHIPS = [
  { label: 'Campus life', color: '#1F4FE0' },
  { label: 'Learning and study', color: '#F5A623' },
  { label: 'Local community', color: '#1FAA59' },
  { label: 'Accessibility', color: '#E8392D' },
  { label: 'Open choice', color: '#1F4FE0' },
];

const DAY_1_SCHEDULE = [
  {
    step: '01',
    title: 'Check-in and pairing',
    accent: '#1F4FE0',
  },
  {
    step: '02',
    title: 'Opening',
    accent: '#F5A623',
  },
  {
    step: '03',
    title: 'Guided bootcamp led by the speaker',
    accent: '#1FAA59',
  },
  {
    step: '04',
    title: 'Break',
    accent: '#E8392D',
  },
  {
    step: '05',
    title: 'Pick your idea (choose and scope your project with a mentor)',
    accent: '#1F4FE0',
  },
  {
    step: '06',
    title: 'Build time (submission deadline announced on the day)',
    accent: '#F5A623',
  },
  {
    step: '07',
    title: 'Demos and judging',
    accent: '#1FAA59',
  },
  {
    step: '08',
    title: 'Results and closing',
    accent: '#E8392D',
  },
];

const JUDGING_CRITERIA = [
  { label: 'Usefulness and impact', points: 30, color: '#1F4FE0' },
  { label: 'Working demo', points: 25, color: '#1FAA59' },
  { label: 'Creativity', points: 15, color: '#F5A623' },
  { label: 'Effective use of AI tools', points: 15, color: '#E8392D' },
  { label: 'Presentation', points: 15, color: '#1F4FE0' },
];

const RECOGNITION_RULES = [
  {
    text: 'Only the project built during the open build time is judged.',
    dot: '#1F4FE0',
  },
  {
    text: 'The guided bootcamp build is for learning.',
    dot: '#F5A623',
  },
  {
    text: 'Projects are built during the event.',
    dot: '#1FAA59',
  },
  {
    text: 'AI tools allowed.',
    dot: '#1F4FE0',
  },
  {
    text: 'Copied work disqualified.',
    dot: '#E8392D',
  },
  {
    text: 'Projects must be safe and respectful.',
    dot: '#1FAA59',
  },
  {
    text: "Judges' decisions are final.",
    dot: '#F5A623',
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is it free?',
    answer: 'Yes. Entry is free, with no registration fee or hidden charges.',
  },
  {
    question: 'Do I need to know coding?',
    answer:
      "No. You don't need any prior coding experience to attend or to build a project.",
  },
  {
    question: 'What should I bring?',
    answer:
      'Bring a laptop if you have one, and a Google account. Teams can share devices.',
  },
  {
    question: 'Who can attend?',
    answer:
      'The workshop is open to BSSRV students of all branches and departments.',
  },
  {
    question: 'Is it a competition?',
    answer:
      "It's a learning event. Everyone builds and shares, and a judging panel recognises the three best builds using published criteria.",
  },
  {
    question: 'Can I join alone?',
    answer:
      'Yes. You can register individually and pair up at the venue, or build on your own.',
  },
  {
    question: 'What should I build?',
    answer:
      "You can build anything you like, as long as it solves a real problem for someone. Not sure where to start? We'll give you an idea card, and mentors will help you choose and scope your project.",
  },
  {
    question: 'Are there any limits on what I can build?',
    answer:
      'Projects must be safe and respectful: nothing harmful or misleading, and no collecting real personal data without consent.',
  },
  {
    question: 'What is the guided bootcamp?',
    answer:
      'The guided bootcamp is a speaker-led, step-by-step build-along on Day 1 where everyone creates a small app together, with mentors helping.',
  },
  {
    question: 'Is the bootcamp build judged?',
    answer:
      'No. Only the project you build in the open build time is judged.',
  },
  {
    question: 'Do I need a GitHub account?',
    answer:
      'A GitHub account is optional, though it helps if you want to save or share your project, and for the optional Keploy testing bonus.',
  },
  {
    question: 'How are the best builds chosen?',
    answer:
      'The best builds are chosen by a judging panel using the criteria published on this page.',
  },
  {
    question: 'Will there be certificates?',
    answer: 'Certificate details are to be announced.',
  },
];

// ============================================================================
// Main Page Component (Static Server Component)
// ============================================================================
export default function EventPage() {
  // Split EVENT_DATE_TEXT on "|" so the Hero card renders the two lines cleanly
  const dateLines = CONFIG.EVENT_DATE_TEXT.split('|').map((line) =>
    line.trim()
  );

  const hasEventDate = Boolean(
    CONFIG.EVENT_DATE_ISO && CONFIG.EVENT_DATE_ISO.trim().length > 0
  );

  // Structured data for SEO (FAQPage only while dates are TBA; no Event schema or date fields)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const isPlaceholder = (value?: string) =>
    !value || value.trim().startsWith('[') || value.trim() === '';

  const getPartnerLogoSrc = (partner: { name: string; logo: string }) => {
    if (!partner.logo || partner.logo.trim().startsWith('[')) {
      return partner.name === 'Keploy'
        ? '/assets/aistudio/image_9108c23f.png'
        : '/assets/aistudio/Unstop-Logo-Blue_4bf8af3f.svg';
    }
    return partner.logo;
  };

  const getPartnerHref = (partner: { name: string; url?: string }) => {
    if (!partner.url || partner.url.trim().startsWith('[')) {
      return partner.name === 'Keploy'
        ? 'https://keploy.io/'
        : 'https://unstop.com/';
    }
    return partner.url;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F0E6] text-[#111111] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* =====================================================================
          Sticky Top Bar (Desktop 3-Zone Header + Mobile Hamburger Menu)
          ===================================================================== */}
      <SiteHeader
        registrationUrl={CONFIG.REGISTRATION_URL}
        instagramUrl={CONFIG.INSTAGRAM_URL}
      />

      <main id="top" className="flex-1 scroll-mt-14">
        {/* ===================================================================
            SECTION 1: HERO (Mobile: headline + tagline + CTA first, compact artwork second, info card third; Desktop: 2 columns)
            =================================================================== */}
        <section className="w-full bg-[#F4F0E6] pt-6 pb-6 md:pt-6 md:pb-14">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
            {/* Single thin colour bar 24px below header */}
            <div
              className="h-1.5 w-full bg-[#1F4FE0] mb-5 md:mb-8"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-x-8 lg:gap-x-12 md:gap-y-6">
              {/* Block 1 (Mobile 1st, Desktop Left Top): Kicker, Headline, Tagline & Primary Button */}
              <div className="order-1 md:order-none md:col-span-6 md:row-start-1 flex flex-col gap-3.5 sm:gap-4 md:gap-5">
                {/* Location Kicker */}
                <div>
                  <span className="font-pixel text-xs uppercase tracking-wider text-[#111111]">
                    BSSRV · Golaghat
                  </span>
                </div>

                {/* Title: "Build with AI:" in script above "Anybody Can Code." in heavy type */}
                <h1>
                  <span className="block font-script text-4xl sm:text-6xl md:text-6xl lg:text-7xl text-[#1F4FE0] leading-none mb-1">
                    Build with AI:
                  </span>
                  <span className="block font-display text-[2.25rem] sm:text-6xl md:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-tight text-[#111111] uppercase text-balance">
                    Anybody Can Code
                    <span className="font-pixel text-[#E8392D] inline-block ml-0.5">
                      .
                    </span>
                  </span>
                </h1>

                {/* Tagline: "Something is building at BSSRV" */}
                <div className="inline-flex items-center self-start bg-[#111111] text-[#F4F0E6] px-3.5 py-2 border border-[#111111]">
                  <span
                    className="inline-block w-2.5 h-2.5 bg-[#F5A623] mr-2.5 shrink-0 animate-glitch-a"
                    aria-hidden="true"
                  />
                  <p className="font-body font-semibold text-sm sm:text-base md:text-lg tracking-tight">
                    Something is building at BSSRV
                  </p>
                </div>

                {/* Primary Button Below Tagline */}
                <div>
                  <HeroPrimaryButton />
                </div>
              </div>

              {/* Block 2 (Mobile 2nd, Desktop Right Column spanning both rows): Compact on mobile, full-height on desktop */}
              <div className="order-2 md:order-none md:col-span-6 md:col-start-7 md:row-start-1 md:row-span-2 w-full max-w-md mx-auto md:max-w-none md:flex md:flex-col">
                <div className="flex justify-end mb-1.5 md:mb-2" aria-hidden="true">
                  <span className="font-pixel text-[11px] uppercase tracking-wider text-[#111111] text-right">
                    BSSRV Campus
                  </span>
                </div>

                <div className="border-2 border-[#111111] md:border-0 bg-[#F4F0E6] p-1.5 sm:p-2 md:p-0 md:flex-1 md:flex md:flex-col">
                  <div className="md:flex-1 md:min-h-[420px]">
                    <HeroArtwork
                      webpSrc={CONFIG.HERO_ARTWORK_URL}
                      fallbackJpgSrc={CONFIG.HERO_ARTWORK_FALLBACK_URL}
                      alt="Line-art architectural illustration of the Birangana Sati Sadhani Rajyik Vishwavidyalaya (BSSRV) campus building in Golaghat, Assam, framed by flat geometric blocks and pixel staircases in cobalt blue, mustard yellow, green, and crimson red"
                    />
                  </div>
                </div>
              </div>

              {/* Block 3 (Mobile 3rd, Desktop Left Bottom): Date & Venue Card + Highlight Chips */}
              <div className="order-3 md:order-none md:col-span-6 md:row-start-2 flex flex-col justify-end gap-5">
                {/* Date & Venue Card (Heavy bordered box preserved) */}
                <div className="border-2 border-[#111111] bg-[#F4F0E6] p-4 sm:p-5 md:p-6 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#111111]/20">
                    <span className="font-pixel text-xs uppercase tracking-wider text-[#1F4FE0]">
                      Workshop Dates
                    </span>
                    <span className="font-body text-xs font-semibold uppercase bg-[#F5A623] text-[#111111] px-2.5 py-0.5 border border-[#111111]">
                      Two-Part Workshop
                    </span>
                  </div>

                  <div className="space-y-1 text-sm sm:text-base font-semibold text-[#111111]">
                    {dateLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#111111]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <p className="text-sm sm:text-base text-[#111111]/90 flex items-start gap-2">
                      <MapPin
                        className="w-4 h-4 mt-1 shrink-0 text-[#E8392D]"
                        aria-hidden="true"
                      />
                      <span>{CONFIG.VENUE}</span>
                    </p>

                    {hasValidUrl(CONFIG.MAP_URL) && (
                      <a
                        href={CONFIG.MAP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 self-start sm:self-center px-3 py-1.5 border border-[#111111] bg-[#F4F0E6] hover:bg-[#F5A623] text-[#111111] transition-colors duration-150 font-body font-semibold text-xs sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F4FE0] whitespace-nowrap shrink-0"
                      >
                        <MapPin
                          className="w-3.5 h-3.5 text-[#E8392D] shrink-0"
                          aria-hidden="true"
                        />
                        <span>Get directions</span>
                        <ArrowUpRight
                          className="w-3.5 h-3.5 shrink-0"
                          aria-hidden="true"
                        />
                      </a>
                    )}
                  </div>
                </div>

                {/* Hero Highlight Chips */}
                <div
                  className="flex flex-wrap items-center gap-2.5"
                  aria-label="Workshop highlights"
                >
                  {HERO_CHIPS.map((chip) => (
                    <AccentChip
                      key={chip.label}
                      label={chip.label}
                      squareColor={chip.color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Single thin full-width colour bar separating Hero from next band */}
        <div className="w-full h-1.5 bg-[#111111]" aria-hidden="true" />

        {/* ===================================================================
            SECTION 2 & 3 BAND: QUICK FACTS + SUPPORTED BY STRIP + CONDITIONAL COUNTDOWN
            =================================================================== */}
        <div className="w-full bg-[#F4F0E6] pt-6 md:pt-10">
          {/* Quick facts plain-text summary directly below the Hero section */}
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 pb-4 md:pb-6">
            <p className="font-body text-xs sm:text-sm text-[#111111]/85 leading-relaxed">
              <strong className="font-bold text-[#111111]">
                Quick facts:
              </strong>{' '}
              Free entry; open to all BSSRV branches and departments; beginners
              welcome; individuals or teams of up to 3; Day 1 in person, Day 2
              virtual; dates to be announced; BSSRV Campus, Golaghat, Assam.
            </p>
          </div>

          <section
            id="supported-by"
            aria-label="Supported by"
            className={`max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 ${
              hasEventDate ? 'pb-5 md:pb-6' : 'pb-6 md:pb-10'
            }`}
          >
            {/* Centred Supported by strip with equal-size logo tiles and no empty space on the right */}
            <div className="border-2 border-[#111111] bg-[#F4F0E6] px-5 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-5 sm:gap-10">
              <span className="font-pixel text-xs uppercase tracking-wider text-[#111111] shrink-0">
                Supported by
              </span>

              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 sm:gap-10">
                {CONFIG.PARTNERS.map((partner) => {
                  const isUnstop = partner.name === 'Unstop';
                  return (
                    <a
                      key={partner.name}
                      href={getPartnerHref(partner)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-col items-center text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F4FE0]"
                    >
                      <div
                        className={
                          isUnstop ? 'partner-logo-tile' : 'keploy-logo-tile'
                        }
                      >
                        <Image
                          src={getPartnerLogoSrc(partner)}
                          alt={`${partner.name} logo`}
                          width={isUnstop ? 2000 : 654}
                          height={isUnstop ? 796 : 211}
                          loading="lazy"
                          quality={75}
                          sizes={
                            isUnstop
                              ? '(max-width: 767px) 120px, (max-width: 1279px) 14vw, 160px'
                              : '(max-width: 767px) 140px, (max-width: 1279px) 16vw, 180px'
                          }
                          referrerPolicy="no-referrer"
                          className={
                            isUnstop ? 'unstop-logo-img' : 'keploy-logo-img'
                          }
                        />
                      </div>
                      <span className="mt-2 font-body text-xs font-medium text-[#111111]">
                        {partner.role}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          {hasEventDate && (
            <section
              id="countdown"
              className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 pb-6 md:pb-12"
            >
              <FadeUpBlock>
                <CountdownTimer eventDateIso={CONFIG.EVENT_DATE_ISO} />
              </FadeUpBlock>
            </section>
          )}
        </div>

        {/* ===================================================================
            SECTION 4: ABOUT (Top-aligned columns, reduced blank space above next band, restored prompt copy)
            =================================================================== */}
        <section
          id="about"
          className="scroll-mt-14 w-full bg-[#F4F0E6] md:bg-[#FFFFFF] py-10 md:pt-20 md:pb-14"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
            <SectionRule index="01" label="About" barColor="#1F4FE0" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
              <FadeUpBlock className="md:col-span-5 space-y-2">
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase leading-tight text-[#111111] text-balance">
                  About the Workshop
                  <span className="font-pixel text-[#E8392D]">.</span>
                </h2>
                <p className="font-body font-bold text-base md:text-lg text-[#1F4FE0]">
                  No coding experience needed
                </p>
              </FadeUpBlock>

              <FadeUpBlock className="md:col-span-7 border-2 border-[#111111] md:border-0 bg-[#F4F0E6] p-5 sm:p-7 md:p-8 space-y-4 text-base md:text-lg leading-relaxed text-[#111111]">
                <p>
                  <strong>Build with AI: Anybody Can Code</strong> is a free,
                  two-part workshop at Birangana Sati Sadhani Rajyik
                  Vishwavidyalaya (BSSRV) for individuals or teams. With no
                  coding experience needed, participants learn to build anything
                  you can build with AI tools.
                </p>
                <p>
                  This is a learning event. Everyone who builds and shares
                  something takes something away, and the three best builds
                  receive recognition from our partner Keploy.
                </p>
              </FadeUpBlock>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 5: WHO IT'S FOR (3 columns on desktop, sentence-case bold card titles)
            =================================================================== */}
        <section
          id="who-its-for"
          className="scroll-mt-14 w-full bg-[#F4F0E6] py-10 md:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
            <SectionRule index="02" label="Who It's For" barColor="#F5A623" />

            <FadeUpBlock className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 md:mb-10">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase text-[#111111] text-balance">
                Every department. Every skill level
                <span className="font-pixel text-[#1F4FE0]">.</span>
              </h2>
              <span className="font-pixel text-[11px] uppercase bg-[#111111] text-[#F4F0E6] px-3.5 py-1.5 whitespace-nowrap shrink-0 self-start sm:self-auto">
                All BSSRV students
              </span>
            </FadeUpBlock>

            <FadeUpBlock className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
              {/* Card 1: First-timers */}
              <WhoItsForCard
                rotate={-0.6}
                className="border-2 border-[#111111] md:border-0 bg-[#F4F0E6] md:bg-[#FFFFFF] flex flex-col justify-between"
              >
                <div className="h-2 bg-[#1F4FE0] border-b-2 border-[#111111] md:border-b-0" />
                <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <div className="mb-3">
                      <span className="font-pixel text-xs uppercase px-2.5 py-1 bg-[#1F4FE0] text-[#F4F0E6]">
                        01
                      </span>
                    </div>
                    <h3 className="font-body font-bold text-xl sm:text-2xl text-[#111111]">
                      First-timers
                    </h3>
                    <p className="mt-2.5 text-sm sm:text-base md:text-base text-[#111111]/90 leading-relaxed">
                      Never written a single line of code before? Follow the
                      guided bootcamp step by step, then team up with a mentor
                      to turn a simple idea into a working project.
                    </p>
                  </div>
                  <p className="pt-3 border-t border-[#111111]/20 font-body text-sm md:text-base font-semibold text-[#1F4FE0]">
                    No coding experience needed
                  </p>
                </div>
              </WhoItsForCard>

              {/* Card 2: Curious builders */}
              <WhoItsForCard
                rotate={0.5}
                className="border-2 border-[#111111] md:border-0 bg-[#F4F0E6] md:bg-[#FFFFFF] flex flex-col justify-between"
              >
                <div className="h-2 bg-[#F5A623] border-b-2 border-[#111111] md:border-b-0" />
                <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <div className="mb-3">
                      <span className="font-pixel text-xs uppercase px-2.5 py-1 bg-[#F5A623] text-[#111111] border border-[#111111] md:border-0">
                        02
                      </span>
                    </div>
                    <h3 className="font-body font-bold text-xl sm:text-2xl text-[#111111]">
                      Curious builders
                    </h3>
                    <p className="mt-2.5 text-sm sm:text-base md:text-base text-[#111111]/90 leading-relaxed">
                      Have ideas for campus life, study tools, accessibility, or
                      your local community—and want a practical, hands-on way to
                      prototype and share them.
                    </p>
                  </div>
                  <p className="pt-3 border-t border-[#111111]/20 font-body text-sm md:text-base font-semibold text-[#111111]">
                    Open to individuals or teams
                  </p>
                </div>
              </WhoItsForCard>

              {/* Card 3: Coders who want to try AI tools */}
              <WhoItsForCard
                rotate={-0.6}
                className="border-2 border-[#111111] md:border-0 bg-[#F4F0E6] md:bg-[#FFFFFF] flex flex-col justify-between"
              >
                <div className="h-2 bg-[#1FAA59] border-b-2 border-[#111111] md:border-b-0" />
                <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <div className="mb-3">
                      <span className="font-pixel text-xs uppercase px-2.5 py-1 bg-[#1FAA59] text-[#111111] border border-[#111111] md:border-0">
                        03
                      </span>
                    </div>
                    <h3 className="font-body font-bold text-xl sm:text-2xl text-[#111111]">
                      Coders who want to try AI tools
                    </h3>
                    <p className="mt-2.5 text-sm sm:text-base md:text-base text-[#111111]/90 leading-relaxed">
                      Already comfortable with programming? Explore AI-assisted
                      workflows and rapid UI generation to build and share new
                      ideas together.
                    </p>
                  </div>
                  <p className="pt-3 border-t border-[#111111]/20 font-body text-sm md:text-base font-semibold text-[#1FAA59]">
                    Anything you can build with AI tools
                  </p>
                </div>
              </WhoItsForCard>
            </FadeUpBlock>
          </div>
        </section>

        {/* ===================================================================
            SECTION 6: WHAT YOU'LL BUILD (Blue panel + Full-width Cream Idea Cards band)
            =================================================================== */}
        <section id="build" className="scroll-mt-14 w-full">
          <div className="w-full bg-[#F4F0E6] md:bg-[#111111] md:text-[#F4F0E6] py-10 md:py-24">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
              <SectionRule
                index="03"
                label="What You'll Build"
                barColor="#1FAA59"
                darkOnDesktop
              />

              <FadeUpBlock className="border-2 border-[#111111] md:border-0 bg-[#1F4FE0] text-[#F4F0E6] p-5 sm:p-8 md:p-10 space-y-6 md:space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-pixel text-xs uppercase bg-[#F5A623] text-[#111111] px-2.5 py-1 border border-[#111111] md:border-0">
                    Open Track
                  </h2>
                  <span className="font-body text-sm md:text-base font-semibold text-[#F4F0E6]">
                    Individuals or teams of up to 3
                  </span>
                </div>

                <blockquote className="font-body font-bold text-lg sm:text-xl md:text-2xl leading-snug text-[#F4F0E6] text-balance">
                  &ldquo;Use AI to build something useful that makes life better
                  for the people around you.&rdquo;
                </blockquote>

                <div className="space-y-3 text-sm sm:text-base md:text-lg text-[#F4F0E6] max-w-3xl leading-relaxed">
                  <p>
                    Anything you can build with AI tools. Participants choose
                    their own idea, individually or in teams of up to 3 (you can
                    register alone and pair up at the venue).
                  </p>
                  <p>
                    Not sure where to start? Everyone receives an{' '}
                    <a
                      href="#idea-cards"
                      className="font-bold text-[#F5A623] underline underline-offset-4 decoration-2 hover:text-[#FFFFFF] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5A623]"
                    >
                      idea card
                    </a>
                    , and mentors will help you choose and scope your project
                    before open build time begins.
                  </p>
                </div>

                {/* Theme Chips */}
                <div className="pt-5 border-t border-[#F4F0E6]/30 space-y-3">
                  <p className="font-pixel text-xs uppercase tracking-wider text-[#F5A623]">
                    Suggested Themes
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {THEME_CHIPS.map((theme) => (
                      <AccentChip
                        key={theme.label}
                        label={theme.label}
                        squareColor={theme.color}
                      />
                    ))}
                  </div>
                </div>

                {/* Plain-text tools list */}
                <div className="pt-5 border-t border-[#F4F0E6]/30 space-y-3">
                  <p className="font-pixel text-xs uppercase tracking-wider text-[#F5A623]">
                    Tools you&apos;ll use
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                    <div className="border-2 border-[#111111] md:border-0 bg-[#F4F0E6] text-[#111111] p-4 md:p-5">
                      <span className="font-pixel text-[11px] uppercase text-[#1F4FE0] block">
                        AI Prototyping
                      </span>
                      <span className="font-body font-bold text-lg md:text-xl block mt-1">
                        Google AI Studio
                      </span>
                    </div>

                    <div className="border-2 border-[#111111] md:border-0 bg-[#F4F0E6] text-[#111111] p-4 md:p-5">
                      <span className="font-pixel text-[11px] uppercase text-[#1FAA59] block">
                        UI Generation
                      </span>
                      <span className="font-body font-bold text-lg md:text-xl block mt-1">
                        Google Stitch
                      </span>
                    </div>

                    <div className="border-2 border-[#111111] md:border-0 bg-[#F4F0E6] text-[#111111] p-4 md:p-5">
                      <span className="font-pixel text-[11px] uppercase text-[#111111] block">
                        Foundations
                      </span>
                      <span className="font-body font-bold text-lg md:text-xl block mt-1">
                        Web basics (HTML/JS)
                      </span>
                    </div>
                  </div>
                </div>
              </FadeUpBlock>
            </div>
          </div>

          {/* Full-width Cream Band: 10 Idea Cards (#idea-cards) */}
          <IdeaCardsBlock />
        </section>

        {/* ===================================================================
            SECTION 7: SCHEDULE IN TWO PARTS (No repeated "Final timings" or "date to be confirmed"; single-line Day 1 time badge)
            =================================================================== */}
        <section
          id="schedule"
          className="scroll-mt-14 w-full bg-[#F4F0E6] md:bg-[#FFFFFF] py-10 md:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
            <SectionRule index="04" label="Schedule" barColor="#E8392D" />

            <FadeUpBlock className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 md:mb-10">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase text-[#111111]">
                Two-Part Workshop Schedule
                <span className="font-pixel text-[#1FAA59]">.</span>
              </h2>

              <div className="inline-flex items-center gap-2 border border-[#111111] md:border-0 bg-[#F5A623] px-3.5 py-1.5 self-start sm:self-auto">
                <Clock
                  className="w-4 h-4 text-[#111111] shrink-0"
                  aria-hidden="true"
                />
                <span className="font-body text-sm md:text-base font-semibold text-[#111111]">
                  {CONFIG.SCHEDULE_NOTE}
                </span>
              </div>
            </FadeUpBlock>

            <FadeUpBlock className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-start">
              {/* Part 1: Day 1 */}
              <div className="md:col-span-7 lg:col-span-8 border-2 border-[#111111] md:border-0 bg-[#F4F0E6]">
                <div className="bg-[#111111] text-[#F4F0E6] p-5 md:p-6 border-b-2 border-[#111111] md:border-b-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-pixel text-xs uppercase text-[#F5A623] block">
                      Day 1
                    </span>
                    <h3 className="font-body font-bold text-lg sm:text-xl md:text-2xl mt-1">
                      {CONFIG.DAY_1_DATE}
                    </h3>
                  </div>
                  <span className="font-body text-xs sm:text-sm font-semibold bg-[#1F4FE0] text-[#F4F0E6] px-3.5 py-1.5 border border-[#F4F0E6] md:border-0 self-start sm:self-auto whitespace-nowrap shrink-0 tabular-nums">
                    {CONFIG.DAY_1_TIME}
                  </span>
                </div>

                <ol className="divide-y divide-[#111111] md:divide-[#111111]/15">
                  {DAY_1_SCHEDULE.map((item) => (
                    <li
                      key={item.step}
                      className="p-4 sm:p-5 flex items-center gap-4"
                    >
                      <span
                        className="font-pixel text-xs px-2.5 py-1.5 border border-[#111111] md:border-0 shrink-0 tabular-nums"
                        style={{
                          backgroundColor: item.accent,
                          color:
                            item.accent === '#1F4FE0' ||
                            item.accent === '#E8392D'
                              ? '#F4F0E6'
                              : '#111111',
                        }}
                      >
                        {item.step}
                      </span>
                      <span className="font-body font-bold text-sm sm:text-base md:text-base text-[#111111]">
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Part 2: Day 2 */}
              <div className="md:col-span-5 lg:col-span-4 border-2 border-[#111111] md:border-0 bg-[#F4F0E6] flex flex-col justify-between">
                <div className="bg-[#1FAA59] text-[#111111] p-5 md:p-6 border-b-2 border-[#111111] md:border-b-0">
                  <span className="font-pixel text-xs uppercase text-[#111111] block">
                    Day 2
                  </span>
                  <h3 className="font-body font-bold text-lg sm:text-xl md:text-2xl mt-1">
                    {CONFIG.DAY_2_DATE}
                  </h3>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <span className="inline-block font-pixel text-xs uppercase bg-[#F5A623] text-[#111111] px-2.5 py-1 border border-[#111111] md:border-0">
                    Virtual Session
                  </span>
                  <p className="font-body font-bold text-lg md:text-xl text-[#111111]">
                    Virtual guest session on Open Source and GSoC
                  </p>
                  <p className="text-sm sm:text-base md:text-base text-[#111111]/90 leading-relaxed">
                    Hosted online for registered participants. Joining
                    instructions will be shared directly with registered
                    attendees.
                  </p>
                </div>
              </div>
            </FadeUpBlock>
          </div>
        </section>

        {/* ===================================================================
            SECTION 8: BEST BUILDS RECOGNITION (Black full-width band on desktop; Judging Criteria keeps heavy border)
            =================================================================== */}
        <section
          id="recognition"
          className="scroll-mt-14 w-full bg-[#F4F0E6] md:bg-[#111111] md:text-[#F4F0E6] py-10 md:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
            <SectionRule
              index="05"
              label="Recognition"
              barColor="#F5A623"
              darkOnDesktop
            />

            <FadeUpBlock className="mb-6 md:mb-10">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase text-[#111111] md:text-[#F4F0E6] text-balance">
                Best Builds Recognition
                <span className="font-pixel text-[#1F4FE0] md:text-[#F5A623]">
                  .
                </span>
              </h2>
            </FadeUpBlock>

            <FadeUpBlock className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-start">
              {/* Left Column: Partner Recognition & Rules */}
              <div className="md:col-span-5 space-y-5 md:space-y-6">
                <div className="border-2 border-[#111111] md:border-0 bg-[#F4F0E6] text-[#111111] p-5 sm:p-6 md:p-7">
                  <span className="font-pixel text-xs uppercase bg-[#1F4FE0] text-[#F4F0E6] px-2.5 py-1 inline-block mb-3">
                    Keploy Recognition
                  </span>
                  <p className="text-sm sm:text-base md:text-base leading-relaxed text-[#111111]">
                    The three best builds (individual or team) receive in-kind
                    recognition from Keploy, including Keploy Pro credits and
                    co-branded badges (subject to final confirmation).
                  </p>
                </div>

                <div className="border-2 border-[#111111] md:border-0 bg-[#111111] md:bg-[#1C1C1C] text-[#F4F0E6] p-5 sm:p-6 md:p-7">
                  <h3 className="font-body font-bold text-base md:text-lg text-[#F5A623] mb-3">
                    Rules
                  </h3>
                  <ul className="space-y-2.5 text-sm sm:text-base md:text-base text-[#F4F0E6]">
                    {RECOGNITION_RULES.map((rule) => (
                      <li key={rule.text} className="flex items-start gap-2.5">
                        <span
                          className="w-2 h-2 mt-2 shrink-0"
                          style={{ backgroundColor: rule.dot }}
                          aria-hidden="true"
                        />
                        <span>{rule.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Judging Criteria Simple Bar List (Heavy bordered box preserved!) */}
              <div className="md:col-span-7 border-2 border-[#111111] md:border-[#F5A623] bg-[#F4F0E6] text-[#111111] p-5 sm:p-7 md:p-8">
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#111111]">
                  <h3 className="font-body font-bold text-xl sm:text-2xl md:text-2xl text-[#111111]">
                    Judging criteria
                  </h3>
                  <span className="font-pixel text-xs uppercase bg-[#F5A623] text-[#111111] px-2.5 py-1 border border-[#111111] tabular-nums">
                    Out of 100
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  {JUDGING_CRITERIA.map((criterion) => (
                    <div key={criterion.label}>
                      <div className="flex items-baseline justify-between gap-2 mb-1.5">
                        <span className="font-body font-semibold text-sm sm:text-base md:text-base text-[#111111]">
                          {criterion.label}
                        </span>
                        <span className="font-body font-bold text-sm md:text-base text-[#111111] tabular-nums">
                          {criterion.points} / 100
                        </span>
                      </div>
                      <div
                        className="w-full h-3.5 border border-[#111111] bg-[#E5DFD0]"
                        aria-hidden="true"
                      >
                        <div
                          className="h-full border-r border-[#111111]"
                          style={{
                            width: `${criterion.points}%`,
                            backgroundColor: criterion.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-[#111111] flex items-start gap-2.5">
                  <span
                    className="inline-block w-2.5 h-2.5 bg-[#1FAA59] border border-[#111111] mt-1.5 shrink-0"
                    aria-hidden="true"
                  />
                  <p className="font-body font-semibold text-sm sm:text-base md:text-base text-[#111111]">
                    Up to 5 bonus points for testing a project with Keploy
                    (optional)
                  </p>
                </div>
              </div>
            </FadeUpBlock>
          </div>
        </section>

        {/* ===================================================================
            SECTION 9: SPEAKERS (Equal-height cards, DAY 2 tag on Amaan's card, visible "LinkedIn" label)
            =================================================================== */}
        <section
          id="speakers"
          className="scroll-mt-14 w-full bg-[#F4F0E6] py-10 md:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
            <SectionRule index="06" label="Speakers" barColor="#1F4FE0" />

            <FadeUpBlock>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase text-[#111111] mb-6 md:mb-10">
                Speakers &amp; Facilitators
                <span className="font-pixel text-[#F5A623]">.</span>
              </h2>
            </FadeUpBlock>

            <FadeUpBlock>
              {CONFIG.SPEAKERS.length === 0 ? (
                <div className="border-2 border-[#111111] md:border-0 bg-[#F4F0E6] md:bg-[#FFFFFF] p-6 sm:p-8">
                  <span className="font-pixel text-xs uppercase bg-[#1F4FE0] text-[#F4F0E6] px-2.5 py-1 inline-block mb-2">
                    Lineup
                  </span>
                  <h3 className="font-body font-bold text-2xl sm:text-3xl text-[#111111]">
                    Speakers will be announced soon
                  </h3>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 items-stretch">
                  {CONFIG.SPEAKERS.map((speaker, idx) => {
                    const isUnconfirmed =
                      isPlaceholder(speaker.name) ||
                      speaker.name.toLowerCase().includes('to be announced');
                    const hasLinkedin = hasValidUrl(speaker.linkedin);
                    const computedInitials =
                      speaker.initials ||
                      (isUnconfirmed
                        ? 'D1'
                        : speaker.name
                            .split(' ')
                            .map((part) => part[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase());
                    const avatarAlt = isUnconfirmed
                      ? 'Day 1 speaker to be announced'
                      : !isPlaceholder(speaker.org)
                        ? `${speaker.name}, ${speaker.org}`
                        : speaker.name;
                    const dayLabel = `Day ${idx + 1}`;

                    return (
                      <article
                        key={`${speaker.topic}-${idx}`}
                        className="h-full border-2 border-[#111111] md:border-0 bg-[#F4F0E6] md:bg-[#FFFFFF] p-5 sm:p-6 md:p-8 flex flex-col justify-between gap-5"
                      >
                        <div>
                          <div
                            className="h-1.5 w-12 mb-4"
                            style={{
                              backgroundColor: isUnconfirmed
                                ? '#F5A623'
                                : '#1F4FE0',
                            }}
                          />

                          <div className="flex items-center gap-4">
                            <SpeakerAvatar
                              photoSrc={speaker.photo}
                              alt={avatarAlt}
                              initials={computedInitials}
                              accentBg={isUnconfirmed ? '#F5A623' : '#1F4FE0'}
                              accentText={isUnconfirmed ? '#111111' : '#F4F0E6'}
                            />

                            <div className="min-w-0">
                              <span className="font-pixel text-xs uppercase bg-[#F5A623] text-[#111111] px-2.5 py-1 border border-[#111111] md:border-0 inline-block mb-2">
                                {dayLabel}
                              </span>

                              {isUnconfirmed ? (
                                <h3 className="font-body font-bold text-xl sm:text-2xl text-[#111111]">
                                  Day 1 speaker to be announced
                                </h3>
                              ) : (
                                <>
                                  <h3 className="font-body font-bold text-xl sm:text-2xl text-[#111111]">
                                    {speaker.name}
                                  </h3>
                                  {!isPlaceholder(speaker.org) && (
                                    <p className="font-body text-sm md:text-base font-semibold text-[#1F4FE0] mt-0.5">
                                      {speaker.org}
                                    </p>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#111111]/20 flex flex-col gap-3">
                          {speaker.topic && (
                            <p className="text-sm sm:text-base md:text-base text-[#111111]/90">
                              {speaker.topic}
                            </p>
                          )}

                          {hasLinkedin && !isUnconfirmed && (
                            <div>
                              <a
                                href={speaker.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${speaker.name} on LinkedIn`}
                                className="inline-flex items-center gap-2 min-w-[44px] min-h-[44px] px-3 py-2 border border-[#111111] md:border-[#111111]/25 bg-[#F4F0E6] hover:bg-[#F5A623]/25 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F4FE0]"
                              >
                                <Image
                                  src="/linkedin-icon.svg"
                                  alt={`${speaker.name} on LinkedIn`}
                                  width={20}
                                  height={20}
                                  loading="lazy"
                                  sizes="20px"
                                  referrerPolicy="no-referrer"
                                  className="w-5 h-5 block shrink-0"
                                />
                                <span className="font-body font-semibold text-sm text-[#111111]">
                                  LinkedIn
                                </span>
                              </a>
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </FadeUpBlock>
          </div>
        </section>

        {/* ===================================================================
            SECTION 10: GUEST SESSION AND CONDUCT (Full-width White band on desktop)
            =================================================================== */}
        <section
          id="guest-session-conduct"
          className="scroll-mt-14 w-full bg-[#F4F0E6] md:bg-[#FFFFFF] py-10 md:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
            <SectionRule index="07" label="Conduct" barColor="#1FAA59" />

            <FadeUpBlock className="border-2 border-[#111111] md:border-0 bg-[#F4F0E6] p-5 sm:p-7 md:p-9">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#111111]/20">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase text-[#111111]">
                  Guest session and conduct
                  <span className="font-pixel text-[#1FAA59]">.</span>
                </h2>
                <span className="font-pixel text-xs uppercase bg-[#F5A623] text-[#111111] px-2.5 py-1 border border-[#111111] md:border-0 self-start sm:self-auto">
                  Day 2 Online
                </span>
              </div>
              <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-[#111111]">
                Day 2 runs virtually over Google Meet. The link is shared only
                with registered participants. Join with the Google account you
                registered with, keep your microphone muted and camera off unless
                invited, ask questions in the chat, and fill in the attendance
                form once. Please be respectful. Do not share the link or record
                the session.
              </p>
            </FadeUpBlock>
          </div>
        </section>

        {/* ===================================================================
            SECTION 11: ORGANISERS (Full-width Cream band, 2 columns on desktop)
            =================================================================== */}
        <section
          id="organisers"
          className="scroll-mt-14 w-full bg-[#F4F0E6] py-10 md:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
            <SectionRule index="08" label="Organisers" barColor="#1F4FE0" />

            <FadeUpBlock className="border-2 border-[#111111] md:border-0 bg-[#F4F0E6] md:bg-transparent p-5 sm:p-7 md:p-0 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-start">
              <div className="md:col-span-5 space-y-2">
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase text-[#111111] leading-tight">
                  Organisers
                  <span className="font-pixel text-[#1FAA59]">.</span>
                </h2>
              </div>

              <div className="md:col-span-7 md:bg-[#FFFFFF] md:p-8 space-y-3">
                <p className="font-body font-semibold text-base sm:text-lg leading-relaxed text-[#111111]">
                  Organised by B.Tech 3rd &amp; 5th semester students of BSSRV, a
                  state university in Golaghat, in collaboration with the Robotics
                  Club and the {CONFIG.DEPARTMENT_NAME}.
                </p>
                <p className="pt-3 border-t border-[#111111]/20 font-body text-sm md:text-base font-medium text-[#111111]/90">
                  Supported by BSSRV.
                </p>
              </div>
            </FadeUpBlock>
          </div>
        </section>

        {/* ===================================================================
            SECTION 12: FAQ ACCORDION (Full-width White band on desktop, 2 columns at 768px+)
            =================================================================== */}
        <section
          id="faq"
          className="scroll-mt-14 w-full bg-[#F4F0E6] md:bg-[#FFFFFF] py-10 md:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
            <SectionRule index="09" label="FAQ" barColor="#E8392D" />

            <FadeUpBlock className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 md:mb-10">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase text-[#111111]">
                Questions &amp; Answers
                <span className="font-pixel text-[#E8392D]">.</span>
              </h2>
              <p className="font-body text-sm md:text-base font-medium text-[#111111]/85">
                Everything you need to know
              </p>
            </FadeUpBlock>

            <FadeUpBlock>
              <FaqAccordion items={FAQ_ITEMS} />
            </FadeUpBlock>
          </div>
        </section>

        {/* ===================================================================
            SECTION 13: CONTACT AND FOOTER (Single-line smaller headline, full-width email card, no phone number)
            =================================================================== */}
        <footer
          id="contact"
          className="scroll-mt-14 w-full border-t-2 border-[#111111] md:border-t-0 bg-[#111111] text-[#F4F0E6]"
        >
          <div className="h-1.5 w-full bg-[#1F4FE0]" aria-hidden="true" />

          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#F4F0E6]/20">
              {/* Left Column: Single-line smaller headline, Tagline, Final Registration CTA */}
              <div className="md:col-span-5 lg:col-span-6 flex flex-col justify-between gap-6">
                <div>
                  <p className="font-display text-lg sm:text-xl lg:text-2xl uppercase text-[#F4F0E6] leading-snug">
                    Build with AI: Anybody Can Code
                  </p>
                  <p className="mt-2 font-body text-sm sm:text-base md:text-lg font-medium text-[#1FAA59]">
                    Something is building at BSSRV
                  </p>
                </div>

                <div>
                  <RegistrationButton variant="primary" />
                </div>
              </div>

              {/* Right Column: Contact Details & Venue (Email spans full row width so address never breaks mid-word; phone removed) */}
              <div className="md:col-span-7 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {/* Email (Spans full width of its row) */}
                <div className="sm:col-span-2 border border-[#F4F0E6]/30 md:border-0 bg-[#111111] md:bg-[#1C1C1C] p-4 md:p-5">
                  <div className="flex items-center gap-2 font-pixel text-xs uppercase text-[#F5A623]">
                    <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Email</span>
                  </div>
                  <div className="mt-2 text-[15px] sm:text-base whitespace-nowrap overflow-x-auto">
                    {isPlaceholder(CONFIG.CONTACT_EMAIL) ? (
                      <span className="text-[#F4F0E6]/90">
                        {CONFIG.CONTACT_EMAIL}
                      </span>
                    ) : (
                      <a
                        href={`mailto:${CONFIG.CONTACT_EMAIL}`}
                        className="underline decoration-[#F5A623] underline-offset-4 hover:text-[#F5A623]"
                      >
                        {CONFIG.CONTACT_EMAIL}
                      </a>
                    )}
                  </div>
                </div>

                {/* Instagram */}
                <div className="border border-[#F4F0E6]/30 md:border-0 bg-[#111111] md:bg-[#1C1C1C] p-4 md:p-5">
                  <div className="flex items-center gap-2 font-pixel text-xs uppercase text-[#E8392D]">
                    <Share2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Instagram</span>
                  </div>
                  <div className="mt-2 text-sm sm:text-base md:text-base">
                    {isPlaceholder(CONFIG.INSTAGRAM_URL) ? (
                      <span className="text-[#F4F0E6]/90">
                        {CONFIG.INSTAGRAM_URL}
                      </span>
                    ) : (
                      <a
                        href={CONFIG.INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 underline decoration-[#E8392D] underline-offset-4 hover:text-[#F5A623]"
                      >
                        <span>Follow updates</span>
                        <ArrowUpRight className="w-4 h-4 shrink-0" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Venue */}
                <div className="border border-[#F4F0E6]/30 md:border-0 bg-[#111111] md:bg-[#1C1C1C] p-4 md:p-5">
                  <div className="flex items-center gap-2 font-pixel text-xs uppercase text-[#1F4FE0]">
                    <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Venue</span>
                  </div>
                  <p className="mt-2 text-sm sm:text-base md:text-base text-[#F4F0E6]/90">
                    {CONFIG.VENUE}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Disclaimer Line */}
            <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm md:text-base text-[#F4F0E6]/90">
              <p className="font-semibold text-[#F5A623]">
                This is a student-organised event.
              </p>
              <p>
                Birangana Sati Sadhani Rajyik Vishwavidyalaya (BSSRV), Golaghat,
                Assam
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

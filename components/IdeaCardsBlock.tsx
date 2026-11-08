'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  LayoutGrid,
  Sparkles,
} from 'lucide-react';

export interface IdeaCardItem {
  number: number;
  title: string;
  description: string;
}

export const IDEA_CARDS: IdeaCardItem[] = [
  {
    number: 1,
    title: 'Study buddy',
    description:
      'Turn notes or past question papers into quizzes and summaries.',
  },
  {
    number: 2,
    title: 'Campus guide',
    description: 'An info page or FAQ helper for new students.',
  },
  {
    number: 3,
    title: 'Local language helper',
    description: 'Explain or translate simple text in Assamese.',
  },
  {
    number: 4,
    title: 'Accessibility helper',
    description: 'Simplify text or read it aloud.',
  },
  {
    number: 5,
    title: 'Local shop or farmer helper',
    description: 'A simple info page for prices, crops or services.',
  },
  {
    number: 6,
    title: 'Healthy habits tracker',
    description: 'Reminders and streaks (no medical advice).',
  },
  {
    number: 7,
    title: 'Club organiser',
    description: 'A registration and schedule page for a club event.',
  },
  {
    number: 8,
    title: 'Student budget helper',
    description: 'Track spending and suggest simple savings.',
  },
  {
    number: 9,
    title: 'Career prep',
    description: 'Practice interview questions and resume tips.',
  },
  {
    number: 10,
    title: 'Your branch helper',
    description: 'A formula explainer, unit converter or lab-report helper.',
  },
];

const SWIPE_DISTANCE_THRESHOLD = 65;
const SWIPE_VELOCITY_THRESHOLD = 380;

function formatIdeaBadge(num: number): string {
  return `Idea ${String(num).padStart(2, '0')}`;
}

export function IdeaCardsBlock() {
  const prefersReducedMotion = useReducedMotion();
  const [deck, setDeck] = useState<IdeaCardItem[]>(IDEA_CARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right'>('left');
  const [highlightedNumber, setHighlightedNumber] = useState<number | null>(
    null
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stackRegionRef = useRef<HTMLDivElement | null>(null);
  const gridCardRefs = useRef<Record<number, HTMLElement | null>>({});

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const triggerHighlight = (cardNumber: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHighlightedNumber(cardNumber);
    timeoutRef.current = setTimeout(() => {
      setHighlightedNumber(null);
    }, 3000);
  };

  // Move the front card to the back of the stack and advance counter
  const handleNext = (direction: 'left' | 'right' = 'left') => {
    setHasInteracted(true);
    setExitDirection(direction);
    setCurrentIndex((prev) => (prev + 1) % IDEA_CARDS.length);
  };

  // Bring the back card of the stack to the front and step counter back
  const handlePrev = () => {
    setHasInteracted(true);
    setExitDirection('right');
    setCurrentIndex(
      (prev) => (prev - 1 + IDEA_CARDS.length) % IDEA_CARDS.length
    );
  };

  // Shuffle the stack and bring a random card (different from the current front card) to the front
  const handleSurpriseMe = () => {
    setHasInteracted(true);
    setExitDirection('left');

    const currentFrontNumber = deck[currentIndex]?.number;
    const copy = [...IDEA_CARDS];

    // Fisher-Yates shuffle
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }

    // Ensure the new front card is different from the current front card
    if (copy[0].number === currentFrontNumber && copy.length > 1) {
      const swapIdx = 1 + Math.floor(Math.random() * (copy.length - 1));
      const temp = copy[0];
      copy[0] = copy[swapIdx];
      copy[swapIdx] = temp;
    }

    const picked = copy[0];
    setDeck(copy);
    setCurrentIndex(0);
    triggerHighlight(picked.number);

    if (isGridOpen) {
      const cardEl = gridCardRefs.current[picked.number];
      if (cardEl) {
        cardEl.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isGridOpen) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      handleNext('left');
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handlePrev();
    }
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const movedFarEnough = Math.abs(info.offset.x) > SWIPE_DISTANCE_THRESHOLD;
    const movedFastEnough =
      Math.abs(info.velocity.x) > SWIPE_VELOCITY_THRESHOLD;

    if (movedFarEnough || movedFastEnough) {
      handleNext(info.offset.x < 0 ? 'left' : 'right');
    }
  };

  // Render at most 3 stacked cards at once starting from currentIndex
  const visibleStack: IdeaCardItem[] = [
    deck[currentIndex % deck.length],
    deck[(currentIndex + 1) % deck.length],
    deck[(currentIndex + 2) % deck.length],
  ];
  const frontCard = visibleStack[0] || IDEA_CARDS[0];

  const transitionConfig = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.15, ease: 'easeOut' as const };

  return (
    <div
      id="idea-cards"
      className="scroll-mt-14 w-full bg-[#F4F0E6] text-[#111111] py-10 md:py-20 border-t-2 border-[#111111]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 space-y-6 md:space-y-8">
        {/* Header Row + Surprise Me Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase text-[#111111] text-balance">
              Not sure what to build? Start here.
            </h3>
            <p className="font-body text-base md:text-lg text-[#111111]/90">
              Pick one of these, remix it, or bring your own.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSurpriseMe}
            className="inline-flex items-center justify-center gap-2 self-start sm:self-auto min-h-[44px] px-4 py-2.5 border-2 border-[#111111] bg-[#F5A623] text-[#111111] hover:bg-[#1F4FE0] hover:text-[#F4F0E6] transition-colors duration-150 font-body font-bold text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F4FE0] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Surprise me</span>
          </button>
        </div>

        {/* Screen-reader live region: empty on first load so it only announces after user interaction */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {hasInteracted
            ? `${formatIdeaBadge(frontCard.number)} (${currentIndex + 1} of ${IDEA_CARDS.length}): ${frontCard.title}. ${frontCard.description}`
            : ''}
        </div>

        <div id="idea-cards-view">
          {!isGridOpen ? (
            /* ===============================================================
               DEFAULT VIEW: 3-Card Stack (Max 3 cards rendered in DOM)
               =============================================================== */
            <div className="max-w-2xl mx-auto pt-2 pb-4">
              {/* Focusable Stack Region with visible focus outline so Left/Right arrow keys work continuously */}
              <div
                ref={stackRegionRef}
                tabIndex={0}
                role="region"
                aria-roledescription="carousel"
                aria-label={`Starter project idea cards stack. Showing ${formatIdeaBadge(frontCard.number)}, card ${currentIndex + 1} of ${IDEA_CARDS.length}. Use Left and Right arrow keys to change cards.`}
                onKeyDown={handleKeyDown}
                onPointerDown={() => {
                  stackRegionRef.current?.focus({ preventScroll: true });
                }}
                className="relative w-full min-h-[240px] sm:min-h-[260px] pr-4 pb-4 select-none focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F4FE0]"
                style={{
                  touchAction: 'pan-y',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                }}
              >
                <AnimatePresence initial={false} mode="popLayout">
                  {visibleStack
                    .map((card, stackIndex) => ({ card, stackIndex }))
                    .reverse()
                    .map(({ card, stackIndex }) => {
                      const isFront = stackIndex === 0;
                      const isHighlighted = highlightedNumber === card.number;

                      // Offset by ~8px per layer and rotated 1 to 2 degrees
                      const targetX = stackIndex === 0 ? 0 : stackIndex * 8;
                      const targetY = stackIndex === 0 ? 0 : stackIndex * 8;
                      const targetRotate =
                        stackIndex === 0 ? 0 : stackIndex === 1 ? 1.5 : -1.5;

                      return (
                        <motion.article
                          key={card.number}
                          drag={isFront ? 'x' : false}
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={0.65}
                          onDragEnd={isFront ? handleDragEnd : undefined}
                          aria-hidden={!isFront}
                          initial={
                            prefersReducedMotion
                              ? false
                              : {
                                  opacity: 0,
                                  x: 16,
                                  y: 16,
                                  rotate: -1.5,
                                }
                          }
                          animate={{
                            opacity: 1,
                            x: targetX,
                            y: targetY,
                            rotate: targetRotate,
                          }}
                          exit={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : {
                                  opacity: 0,
                                  x: exitDirection === 'left' ? -140 : 140,
                                  rotate: exitDirection === 'left' ? -4 : 4,
                                }
                          }
                          transition={transitionConfig}
                          style={{
                            zIndex: 30 - stackIndex * 10,
                            touchAction: 'pan-y',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                          }}
                          className={`${
                            isFront
                              ? 'relative cursor-grab active:cursor-grabbing'
                              : 'absolute inset-0 right-4 bottom-4 pointer-events-none'
                          } select-none w-full min-h-[220px] sm:min-h-[240px] flex flex-col justify-between p-6 sm:p-8 md:p-10 ${
                            stackIndex === 1 ? 'bg-[#F4F0E6]' : 'bg-[#FFFFFF]'
                          } text-[#111111] ${
                            isFront && isHighlighted
                              ? 'border-4 border-[#1F4FE0]'
                              : 'border-2 border-[#111111]'
                          }`}
                        >
                          <div className="space-y-4 select-none">
                            <div className="flex items-center justify-between gap-3">
                              <span
                                className={`font-pixel text-xs sm:text-sm px-2.5 py-1 border border-[#111111] ${
                                  isFront && isHighlighted
                                    ? 'bg-[#1F4FE0] text-[#F4F0E6]'
                                    : 'bg-[#F5A623] text-[#111111]'
                                }`}
                              >
                                {formatIdeaBadge(card.number)}
                              </span>

                              {isFront && isHighlighted && (
                                <span className="font-pixel text-[11px] uppercase tracking-wider text-[#1F4FE0]">
                                  Random Pick
                                </span>
                              )}
                            </div>

                            <h4 className="font-body font-bold text-2xl sm:text-3xl text-[#111111] leading-tight">
                              {card.title}
                            </h4>

                            <p className="font-body text-base sm:text-lg md:text-xl text-[#111111]/90 leading-relaxed">
                              {card.description}
                            </p>
                          </div>
                        </motion.article>
                      );
                    })}
                </AnimatePresence>
              </div>

              {/* Controls Row: Previous, Counter ("3 of 10") + First-Time Hint, Next */}
              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous idea card"
                  className="inline-flex items-center justify-center gap-1.5 min-w-[44px] min-h-[44px] px-3.5 py-2 border-2 border-[#111111] bg-[#FFFFFF] hover:bg-[#F5A623] text-[#111111] transition-colors duration-150 font-body font-bold text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F4FE0] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Previous</span>
                </button>

                <div className="flex flex-col items-center text-center">
                  <span className="font-pixel text-xs sm:text-sm uppercase tracking-wider text-[#111111]">
                    {currentIndex + 1} of {IDEA_CARDS.length}
                  </span>
                  {!hasInteracted && (
                    <span className="font-body text-xs text-[#111111]/75 mt-0.5">
                      Swipe or use the arrows
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleNext('left')}
                  aria-label="Next idea card"
                  className="inline-flex items-center justify-center gap-1.5 min-w-[44px] min-h-[44px] px-3.5 py-2 border-2 border-[#111111] bg-[#FFFFFF] hover:bg-[#F5A623] text-[#111111] transition-colors duration-150 font-body font-bold text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F4FE0] cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          ) : (
            /* ===============================================================
               EXPANDED VIEW: All 10 Cards Grid
               =============================================================== */
            <ol
              aria-label="Starter project ideas"
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-4 md:gap-5 list-none"
            >
              {IDEA_CARDS.map((card) => {
                const isHighlighted = highlightedNumber === card.number;
                return (
                  <li
                    key={card.number}
                    className="w-[75%] shrink-0 snap-start sm:w-auto sm:shrink flex"
                  >
                    <article
                      ref={(el) => {
                        gridCardRefs.current[card.number] = el;
                      }}
                      tabIndex={0}
                      aria-label={`${formatIdeaBadge(card.number)}: ${card.title}`}
                      className={`w-full flex flex-col justify-between p-4 sm:p-5 bg-[#FFFFFF] text-[#111111] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F4FE0] ${
                        isHighlighted
                          ? 'border-4 border-[#1F4FE0] ring-2 ring-[#1F4FE0]'
                          : 'border-2 border-[#111111]'
                      }`}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`font-pixel text-xs px-2 py-0.5 border border-[#111111] transition-colors duration-150 ${
                              isHighlighted
                                ? 'bg-[#1F4FE0] text-[#F4F0E6]'
                                : 'bg-[#F4F0E6] text-[#111111]'
                            }`}
                          >
                            {formatIdeaBadge(card.number)}
                          </span>
                          {isHighlighted && (
                            <span className="font-pixel text-[10px] uppercase tracking-wider text-[#1F4FE0]">
                              Picked
                            </span>
                          )}
                        </div>

                        <h4 className="font-body font-bold text-base sm:text-lg text-[#111111] leading-snug">
                          {card.title}
                        </h4>

                        <p className="font-body text-sm text-[#111111]/90 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        {/* Toggle Button Below the Stack / Grid */}
        <div className="flex justify-center">
          <button
            type="button"
            aria-expanded={isGridOpen}
            aria-controls="idea-cards-view"
            onClick={() => setIsGridOpen((prev) => !prev)}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 border-2 border-[#111111] bg-[#FFFFFF] hover:bg-[#111111] hover:text-[#F4F0E6] text-[#111111] transition-colors duration-150 font-body font-bold text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F4FE0] cursor-pointer"
          >
            {isGridOpen ? (
              <>
                <Layers className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>See all 10 ideas (stack view)</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>See all 10 ideas</span>
              </>
            )}
          </button>
        </div>

        {/* Bottom Prompt Line */}
        <div className="border-2 border-[#111111] bg-[#FFFFFF] px-4 py-3.5 sm:px-6 sm:py-4">
          <p className="font-body font-semibold text-sm sm:text-base md:text-lg text-[#111111]">
            One problem, one user, one screen. Write one sentence:{' '}
            <span className="font-bold text-[#1F4FE0]">
              I&apos;m building ___ for ___ so that ___.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

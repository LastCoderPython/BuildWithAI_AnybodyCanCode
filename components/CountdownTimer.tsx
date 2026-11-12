'use client';

import React, { useEffect, useState } from 'react';

export function CountdownTimer({ eventDateIso }: { eventDateIso: string }) {
  const hasDate = Boolean(eventDateIso && eventDateIso.trim().length > 0);

  const [countdown, setCountdown] = useState<{
    isPast: boolean;
    days: number;
    hours: number;
    minutes: number;
    mounted: boolean;
  }>({
    isPast: false,
    days: 0,
    hours: 0,
    minutes: 0,
    mounted: false,
  });

  useEffect(() => {
    if (!hasDate) return;

    const targetMs = new Date(eventDateIso).getTime();

    const updateTimer = () => {
      const nowMs = Date.now();
      const diff = targetMs - nowMs;

      if (Number.isNaN(targetMs) || diff <= 0) {
        setCountdown({
          isPast: true,
          days: 0,
          hours: 0,
          minutes: 0,
          mounted: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);

      setCountdown({
        isPast: false,
        days,
        hours,
        minutes,
        mounted: true,
      });
    };

    updateTimer();
    // Update once per minute (60,000 ms), not every second
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [eventDateIso, hasDate]);

  if (!hasDate) {
    return null;
  }

  return (
    <div className="min-h-[92px] sm:h-[100px] border-2 border-[#111111] md:border-0 bg-[#111111] text-[#F4F0E6] px-5 py-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
      <div className="flex items-center gap-2.5">
        <span
          className="inline-block w-3 h-3 bg-[#F5A623] shrink-0"
          aria-hidden="true"
        />
        <h2 className="font-pixel text-xs uppercase tracking-wider text-[#F5A623]">
          Day 1 Countdown
        </h2>
      </div>

      {!countdown.mounted ? (
        <div className="flex items-baseline gap-3 sm:gap-4 font-display text-2xl sm:text-3xl tabular-nums text-[#F4F0E6]">
          <span>--d</span>
          <span className="text-[#F5A623]">:</span>
          <span>--h</span>
          <span className="text-[#F5A623]">:</span>
          <span>--m</span>
        </div>
      ) : countdown.isPast ? (
        <p className="font-display text-xl sm:text-2xl uppercase tracking-tight text-[#F5A623]">
          Day 1 is live
        </p>
      ) : (
        <div
          className="flex items-center gap-2.5 sm:gap-4"
          role="timer"
          aria-live="polite"
          aria-label={`Countdown to Day 1: ${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes`}
        >
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl sm:text-3xl leading-none tabular-nums text-[#F4F0E6]">
              {String(countdown.days).padStart(2, '0')}
            </span>
            <span className="font-body text-xs sm:text-sm font-medium text-[#F5A623]">
              days
            </span>
          </div>

          <span
            className="font-display text-xl sm:text-2xl text-[#F5A623] select-none"
            aria-hidden="true"
          >
            :
          </span>

          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl sm:text-3xl leading-none tabular-nums text-[#F4F0E6]">
              {String(countdown.hours).padStart(2, '0')}
            </span>
            <span className="font-body text-xs sm:text-sm font-medium text-[#F5A623]">
              hours
            </span>
          </div>

          <span
            className="font-display text-xl sm:text-2xl text-[#F5A623] select-none"
            aria-hidden="true"
          >
            :
          </span>

          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl sm:text-3xl leading-none tabular-nums text-[#F4F0E6]">
              {String(countdown.minutes).padStart(2, '0')}
            </span>
            <span className="font-body text-xs sm:text-sm font-medium text-[#F5A623]">
              mins
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

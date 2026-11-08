'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="border-2 border-[#111111] bg-[#F4F0E6] divide-y divide-[#111111] md:border-0 md:bg-transparent md:divide-y-0 md:grid md:grid-cols-2 md:gap-5 md:items-start">
      {items.map((item, idx) => {
        const isOpen = openFaqIndex === idx;
        const panelId = `faq-panel-${idx}`;
        const buttonId = `faq-button-${idx}`;

        return (
          <div
            key={item.question}
            className="bg-[#F4F0E6] md:p-1"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#F5A623]/20 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1F4FE0] transition-colors"
              >
                <span className="font-body font-bold text-base sm:text-lg text-[#111111]">
                  {item.question}
                </span>
                <span
                  className={`w-7 h-7 border border-[#111111] md:border-0 flex items-center justify-center shrink-0 transition-transform duration-150 ${
                    isOpen
                      ? 'bg-[#1F4FE0] text-[#F4F0E6] rotate-180'
                      : 'bg-[#F5A623] text-[#111111]'
                  }`}
                  aria-hidden="true"
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
            </h3>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2 text-sm sm:text-base text-[#111111] border-t border-[#111111]/15 md:border-t-0 bg-[#F4F0E6] leading-relaxed"
              >
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

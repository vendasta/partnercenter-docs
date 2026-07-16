import React, { useState, ReactNode } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  badge: string; // Can be a letter, number, or emoji
  content: ReactNode; // Flexible content - can be text, JSX, or complex components
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string; // Optional custom class for styling variants
  showControls?: boolean; // Show Expand/Collapse All button
  defaultExpanded?: string[]; // IDs of items to expand by default
}

export default function Accordion({
  items,
  className = 'accordion',
  showControls = true,
  defaultExpanded = []
}: AccordionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpanded);

  const toggleItem = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const expandAll = () => {
    setExpandedItems(items.map(item => item.id));
  };

  const collapseAll = () => {
    setExpandedItems([]);
  };

  const areAllExpanded = expandedItems.length === items.length;

  return (
    <div className={className}>
      {showControls && (
        <div className={`${className}__controls`}>
          <button
            onClick={areAllExpanded ? collapseAll : expandAll}
            className={`${className}__control-btn`}
          >
            {areAllExpanded ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      )}

      <div className={`${className}__items`}>
        {items.map((item) => {
          const isExpanded = expandedItems.includes(item.id);
          return (
            <div
              key={item.id}
              className={`${className}__item ${isExpanded ? `${className}__item--expanded` : ''}`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className={`${className}__header`}
                aria-expanded={isExpanded}
              >
                <div className={`${className}__header-left`}>
                  <span className={`${className}__badge`}>{item.badge}</span>
                  <span className={`${className}__title`}>{item.title}</span>
                </div>
                <svg
                  className={`${className}__icon`}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isExpanded && (
                <div className={`${className}__content`}>
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, {useId} from 'react';

type IconProps = {size?: number; className?: string};

export function SparkleIcon({size = 26, className}: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true">
      <path d="M12 2c.4 4.6 2.9 7.3 7.5 7.8V12c-4.6.5-7.1 3.2-7.5 7.8h-2.2C9.4 15.2 6.9 12.5 2.3 12v-2.2C6.9 9.3 9.4 6.6 9.8 2H12z" />
    </svg>
  );
}

/**
 * Outlined four-point star, the AI mark across search and the assistant. Takes the text
 * colour; `gradient` draws it in the light violet-to-blue used on the navy header bar.
 */
export function AiStarIcon({size = 18, className, gradient = false}: IconProps & {gradient?: boolean}) {
  const gradientId = useId();
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {gradient && (
        <defs>
          <linearGradient id={gradientId} x1="5" y1="3" x2="19" y2="21" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d8b4fe" />
            <stop offset="1" stopColor="#93c5fd" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 3c.6 5.2 3.8 8.4 9 9-5.2.6-8.4 3.8-9 9-.6-5.2-3.8-8.4-9-9 5.2-.6 8.4-3.8 9-9z"
        stroke={gradient ? `url(#${gradientId})` : 'currentColor'}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DocIcon({size = 28, className}: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}

export function SearchIcon({size = 26, className}: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.8-3.8" />
    </svg>
  );
}

export function ArrowRightIcon({size = 22, className}: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

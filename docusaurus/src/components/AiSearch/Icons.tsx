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

/** Outlined four-point star with a light violet-to-blue AI gradient, for the navy header bar. */
export function AiStarIcon({size = 18, className}: IconProps) {
  const gradientId = useId();
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="5" y1="3" x2="19" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#d8b4fe" />
          <stop offset="1" stopColor="#93c5fd" />
        </linearGradient>
      </defs>
      <path
        d="M12 3c.6 5.2 3.8 8.4 9 9-5.2.6-8.4 3.8-9 9-.6-5.2-3.8-8.4-9-9 5.2-.6 8.4-3.8 9-9z"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparklesIcon({size = 18, className}: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true">
      <path d="M9 3c.3 3.4 2.2 5.4 5.6 5.7v1.6C11.2 10.6 9.3 12.6 9 16H7.4c-.3-3.4-2.2-5.4-5.6-5.7V8.7C5.2 8.4 7.1 6.4 7.4 3H9z" />
      <path d="M18.5 13c.2 2 1.3 3.2 3.3 3.4v1c-2 .2-3.1 1.4-3.3 3.4h-1c-.2-2-1.3-3.2-3.3-3.4v-1c2-.2 3.1-1.4 3.3-3.4h1z" />
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

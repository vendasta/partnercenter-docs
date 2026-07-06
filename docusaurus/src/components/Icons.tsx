import React from 'react';

export function AISparkleIcon({ size = 16 }: { size?: number } = {}) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}
    >
      <path 
        d="M12 2L13.09 8.26L20 9.24L13.09 10.22L12 16.5L10.91 10.22L4 9.24L10.91 8.26L12 2Z" 
        fill="currentColor"
      />
      <path 
        d="M19 13L19.5 15.5L22 16L19.5 16.5L19 19L18.5 16.5L16 16L18.5 15.5L19 13Z" 
        fill="currentColor"
      />
      <path 
        d="M5 5L5.5 7.5L8 8L5.5 8.5L5 11L4.5 8.5L2 8L4.5 7.5L5 5Z" 
        fill="currentColor"
      />
    </svg>
  );
}

export function SettingsIcon({ size = 16 }: { size?: number } = {}) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}
    >
      <path 
        d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5M19.43 12.98c.04-.32.07-.64.07-.98c0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.30-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11.02c-.04.32-.07.65-.07.98c0 .33.03.66.07.98L2.46 14.63c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.30.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65Z" 
        fill="currentColor"
      />
    </svg>
  );
}

export function CRMIcon({ size = 16 }: { size?: number } = {}) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}
    >
      <path 
        d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2M4 18v-4h3v7H5c-.55 0-1-.45-1-1m9-2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m6-1c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1h-2v-7h3M12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5M16.5 17h-.17l-3.8-3.8c-.39-.39-.9-.7-1.49-.83.85-.98 1.48-2.17 1.83-3.52.16-.63-.34-1.22-1-1.22c-.41 0-.77.25-.92.63-.54 1.37-1.59 2.52-2.93 3.21-.75.39-1.68.61-2.64.61H4c-.55 0-1 .45-1 1V18c0 1.1.9 2 2 2h2.5v3c0 .55.45 1 1 1h7c.55 0 1-.45 1-1v-5c0-.55-.45-1-1-1z" 
        fill="currentColor"
      />
    </svg>
  );
}


export function TaskIcon({ size = 16 }: { size?: number } = {}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}
    >
      <path
        d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"
        fill="currentColor"
      />
    </svg>
  );
}

export default { AISparkleIcon, SettingsIcon, CRMIcon, TaskIcon };

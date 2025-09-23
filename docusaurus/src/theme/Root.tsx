import React from 'react';

export default function Root({children}: {children: React.ReactNode}): React.ReactElement {
  return (
    <>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-M8CQT5"
          height="0" 
          width="0" 
          style={{display: 'none', visibility: 'hidden'}}
        />
      </noscript>
      {children}
    </>
  );
}

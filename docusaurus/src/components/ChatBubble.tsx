import React from 'react';

type ChatMessageProps = {
  children: React.ReactNode;
};

export function ChatUserMessage({ children }: ChatMessageProps) {
  return (
    <div 
      style={{
        background: '#e3f2fd',
        border: '1px solid #2196f3',
        borderRadius: '12px',
        padding: '12px 16px',
        margin: '8px 0',
        marginLeft: '40px',
        position: 'relative',
        fontSize: '14px',
        lineHeight: '1.4'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          left: '-12px',
          top: '12px',
          width: '0',
          height: '0',
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderRight: '12px solid #e3f2fd'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          left: '-13px',
          top: '12px',
          width: '0',
          height: '0',
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderRight: '12px solid #2196f3'
        }}
      />
      <strong style={{ color: '#1565c0', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Customer
      </strong>
      <div style={{ marginTop: '4px' }}>
        {children}
      </div>
    </div>
  );
}

export function ChatAIMessage({ children }: ChatMessageProps) {
  return (
    <div 
      style={{
        background: '#f3e5f5',
        border: '1px solid #9c27b0',
        borderRadius: '12px',
        padding: '12px 16px',
        margin: '8px 0',
        marginRight: '40px',
        position: 'relative',
        fontSize: '14px',
        lineHeight: '1.4'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          right: '-12px',
          top: '12px',
          width: '0',
          height: '0',
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderLeft: '12px solid #f3e5f5'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          right: '-13px',
          top: '12px',
          width: '0',
          height: '0',
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderLeft: '12px solid #9c27b0'
        }}
      />
      <strong style={{ color: '#6a1b9a', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        AI Assistant
      </strong>
      <div style={{ marginTop: '4px' }}>
        {children}
      </div>
    </div>
  );
}

export default { ChatUserMessage, ChatAIMessage };

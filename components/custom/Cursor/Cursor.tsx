'use client';

import useCursor from "@/components/custom/Cursor/useCursor";

const Cursor = () => {
  const { cursorRef, outherRef } = useCursor();

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: 'oklch(55.6% 0.197 10.7)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          transition: 'background-color 0.3s'
        }}
        aria-hidden="true"
      />

      <div
        ref={outherRef}
        data-hover="false"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          border: '1px solid oklch(89.8% 0 0)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999,
          willChange: 'transform',
          transition: 'border-color 0.3s, background-color 0.3s',
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default Cursor;
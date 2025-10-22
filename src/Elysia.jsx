import React from 'react';

const Elysia = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      <iframe
        src="/portals/dreem-journal.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0
        }}
        title="Dreem Journal - Elysia Portal"
      />
    </div>
  );
};

export default Elysia;

import React from 'react';

const Tracking = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      <iframe
        src="/portals/ves-dashboard.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0
        }}
        title="VES Dashboard - Tracking Portal"
      />
    </div>
  );
};

export default Tracking;

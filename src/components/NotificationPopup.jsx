import React from 'react';

function NotificationPopup({ message }) {
  if (!message) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] bg-zinc-900/80 text-white px-6 py-4 rounded-xl shadow-lg">
      {message}
    </div>
  );
}

export default NotificationPopup;
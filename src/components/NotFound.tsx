import React from 'react';
import '../scss/NotFound.scss';
export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__text">Something went wrong</div>
      <button className="not-found__back">go home</button>
    </div>
  );
}

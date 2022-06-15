import React from 'react';

export default function EmptyState({ title, button, handleClick }) {
  return (
    <main className='empty'>
      <h2 className='empty__title'>{title}</h2>
      <button onClick={handleClick} className='empty__button'>
        {button}
      </button>
    </main>
  );
}

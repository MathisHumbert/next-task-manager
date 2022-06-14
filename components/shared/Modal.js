import React, { useEffect } from 'react';

export default function Modal({ isVisible, close, children }) {
  useEffect(() => {
    if (!isVisible) {
      document.body.classList.remove('fixed');
    } else {
      document.body.classList.add('fixed');
    }
  }, [isVisible]);

  const handleClick = (e) => {
    if (!e.target.classList.contains('top')) return;
    close();
  };

  return (
    <div
      className={isVisible ? 'modal top open' : 'modal top'}
      onClick={handleClick}
    >
      <div className='modal__container'>{children}</div>
    </div>
  );
}

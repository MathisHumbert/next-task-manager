import React, { useState } from 'react';
import Image from 'next/image';

export default function ModalDropdown({ columns, status, setStatus }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = (name, id) => {
    setIsDropdownOpen(false);
    setStatus({ name, id });
  };

  return (
    <div
      className={isDropdownOpen ? 'modal__dropdown open' : 'modal__dropdown'}
    >
      <button
        className='modal__dropdown__button'
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {status.name}
        {isDropdownOpen ? (
          <Image
            src='/assets/icon-chevron-up.svg'
            width={10}
            height={7}
            position='fixed'
            alt='chevron-up'
          />
        ) : (
          <Image
            src='/assets/icon-chevron-down.svg'
            width={10}
            height={7}
            position='fixed'
            alt='chevron-down'
          />
        )}
      </button>
      <div className='modal__dropdown__content'>
        {columns.map((item) => (
          <div
            className='dropdown__content__item'
            key={item._id}
            onClick={() => handleClick(item.name, item._id)}
          >
            <p className='dropdown__content__value'>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

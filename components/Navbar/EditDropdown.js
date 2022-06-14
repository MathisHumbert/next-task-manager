import React from 'react';

export default function EditDropdown({ isVisible, close }) {
  return (
    <div className={isVisible ? 'edit__dropdown open' : 'edit__dropdown'}>
      <button className='edit__button__edit' onClick={close}>
        Edit Board
      </button>
      <button className='edit__button__delete' onClick={close}>
        Delete Board
      </button>
    </div>
  );
}

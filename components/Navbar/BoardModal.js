import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const board = [
  {
    _id: 1,
    name: 'Platform Launch',
  },
  {
    _id: 2,
    name: 'Marketing Plan',
  },
  {
    _id: 3,
    name: 'Roadmap',
  },
];

export default function BoardModal({ close, isVisible }) {
  const board_id = 1;

  useEffect(() => {
    if (!isVisible) {
      document.body.classList.remove('fixed');
    } else {
      document.body.classList.add('fixed');
    }
  }, [isVisible]);

  const handleClick = (e) => {
    if (!e.target.classList.contains('board__modal')) return;
    close();
  };

  return (
    <div
      className={isVisible ? 'board__modal open' : 'board__modal'}
      onClick={handleClick}
    >
      <div className='board__container'>
        <p className='board__numbers'>all boards ({board.length})</p>
        <div className='board__items'>
          {board.map((item) => (
            <Link href={`/board/${item._id}`} passHref key={item._id}>
              <a>
                <div
                  className={
                    item._id === board_id ? 'board__item active' : 'board__item'
                  }
                >
                  <Image
                    src='/assets/icon-board.svg'
                    width={16}
                    height={16}
                    alt='board'
                    className='board__item__logo'
                  />
                  <h3 className='board__item__name'>{item.name}</h3>
                </div>
              </a>
            </Link>
          ))}
          <button className='board__items_button'>
            <Image
              src='/assets/icon-board.svg'
              width={16}
              height={16}
              alt='board'
              className='board__button__logo'
            />
            <h3 className='board__button__text'>+ Create New Board</h3>
          </button>
        </div>
        <div className='board__theme'>
          <Image
            src='/assets/icon-light-theme.svg'
            width={19}
            height={19}
            alt='board'
          />
          <Image
            src='/assets/icon-dark-theme.svg'
            width={16}
            height={16}
            alt='board'
          />
        </div>
      </div>
    </div>
  );
}
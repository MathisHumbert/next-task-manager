import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import BoardAside from './BoardAside';
import EditAside from './EditAside';

export default function Navbar() {
  return (
    <>
      <nav className='navbar'>
        <div className='navbar__container'>
          {/* logo */}
          <Link href='/' passHref>
            <a>
              <Image
                src='/assets/logo-mobile.svg'
                width={24}
                height={25}
                position='fixed'
                alt='company-logo'
              />
            </a>
          </Link>
          {/* board name */}
          <h2 className='navbar__title'>home</h2>
          {/* board name input */}
          <div className='navbar__dropdown'>
            <h2 className='navbar__dropdown__title'>home</h2>
            <Image
              src='/assets/icon-chevron-down.svg'
              width={10}
              height={7}
              position='fixed'
              alt='chevron-down'
            />
          </div>
        </div>
        <div className='navbar__container'>
          {/* add new task button */}
          <button className='navbar__add__button'>
            <Image
              src='/assets/icon-add-task-mobile.svg'
              width={12}
              height={12}
              position='fixed'
              alt='chevron-down'
              className='navbar__add__icon'
            />
            <h3 className='navbar__add__text'>+ Add New Task</h3>
          </button>
          {/* board button */}
          <button className='navbar__edit__buton'>
            <Image
              src='/assets/icon-vertical-ellipsis.svg'
              width={5}
              height={20}
              position='fixed'
              alt='chevron-down'
              className='navbar__dropdown__icon'
            />
          </button>
        </div>
      </nav>
      <BoardAside />
      <EditAside />
    </>
  );
}

import React from 'react';

export default function BoardColumns({ name, tasks }) {
  return (
    <section className='board__columns'>
      <h4 className='board__columns__title'>{name}</h4>
    </section>
  );
}

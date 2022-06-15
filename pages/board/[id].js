import React, { useState } from 'react';

import { connectToDatabase } from '../../services/mongodb';
import HeadOfPage from '../../components/shared/HeadOfPage';
import Navbar from '../../components/Navbar/Navbar';
import EmptyState from '../../components/shared/EmptyState';
import BoardColumns from '../../components/board/BoardColumns';
import AddNewTask from '../../components/modals/AddNewTask';

export default function Board({ serverBoards, serverBoard }) {
  const [board, setBoard] = useState(serverBoard[0]);

  return (
    <HeadOfPage title='Home'>
      <Navbar boards={serverBoards} />
      {board.columns.length ? (
        <main className='board'>
          {board.columns.map((item) => (
            <BoardColumns {...item} key={item._id} />
          ))}
        </main>
      ) : (
        <EmptyState
          title='You have no board yet. Create a new board to get started.'
          button='+ Add New Board'
          handleClick={() => {}}
        />
      )}
      <AddNewTask id={board._id} columns={board.columns} />
    </HeadOfPage>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  // const session = await getSession(context);

  // if (!session) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/register',
  //     },
  //   };
  // }

  const { db } = await connectToDatabase();
  const boards = await db.collection('board').find().toArray();
  const board = await db.collection('board').find({ _id: id }).toArray();

  return {
    props: {
      // session,
      serverBoards: boards,
      serverBoard: board,
    },
  };
}

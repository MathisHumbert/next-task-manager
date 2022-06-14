import React from 'react';
import { useDispatch } from 'react-redux';

import { toggleNewBoard } from '../features/modal/modalSlice';
import HeadOfPage from '../components/shared/HeadOfPage';
import EmptyState from '../components/shared/EmptyState';
import AddNewBoard from '../components/modals/AddNewBoard';
import DeleteTask from '../components/modals/DeleteTask';
export default function Home() {
  const boards = [];
  const dispatch = useDispatch();

  return (
    <HeadOfPage title='Home'>
      {boards.length ? (
        <main className='home'>
          <h1 className='home__title'>Choose the board that you want to see</h1>
        </main>
      ) : (
        <EmptyState
          title='You have no board yet. Create a new board to get started.'
          button='+ Add New Board'
          handleClick={() => dispatch(toggleNewBoard())}
        />
      )}
      <AddNewBoard />
      <DeleteTask />
    </HeadOfPage>
  );
}

// export async function getServerSideProps(context) {
//   // const session = await getSession(context);

//   // if (!session) {
//   //   return {
//   //     redirect: {
//   //       permanent: false,
//   //       destination: '/register',
//   //     },
//   //   };
//   // }

//   const { db } = await connectToDatabase();
//   const boards = await db.collection('boards').find().toArray();
//   console.log(boards);

//   return {
//     props: {
//       // session,
//       serverBoards: boards,
//     },
//   };
// }

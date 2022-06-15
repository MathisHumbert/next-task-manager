import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { connectToDatabase } from '../services/mongodb';

import { toggleNewBoard } from '../features/modal/modalSlice';
import HeadOfPage from '../components/shared/HeadOfPage';
import EmptyState from '../components/shared/EmptyState';
import AddNewBoard from '../components/modals/AddNewBoard';

export default function Home({ serverBoards }) {
  const boards = [];
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await axios.get('/api/board');
  //     console.log(data);
  //   };

  //   fetchData();
  // }, []);

  console.log(serverBoards);

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
    </HeadOfPage>
  );
}

export async function getServerSideProps(context) {
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

  return {
    props: {
      // session,
      serverBoards: boards,
    },
  };
}

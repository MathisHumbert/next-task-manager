import { connectToDatabase } from '../../../services/mongodb';
import uniqid from 'uniqid';

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { db } = await connectToDatabase();

  // get a single board
  if (method === 'GET') {
    const { id } = query;

    const board = await db.collection('board').find({ _id: id }).toArray();

    res.status(200).json(board);
  }

  if (method === 'PATCH') {
  }

  // delete a board and all of his tasks
  if (method === 'DELETE') {
    const { id } = query;

    const board = await db.collection('board').deleteOne({ _id: id });

    const tasks = await db.collection('task').deleteMany({ boardId: id });

    res.status(200).json(board, tasks);
  }
}

// board: {
//   _id: 'id',
//   name: '',
//   columns: ['', '']
// }

import { connectToDatabase } from '../../../services/mongodb';
import uniqid from 'uniqid';

// get user id
export default async function handler(req, res) {
  const { method, query, body } = req;
  const { db } = await connectToDatabase();

  if (method === 'GET') {
    const board = await db.collections('board');

    res.status(200).json(board);
  }

  if (method === 'PUT') {
    const { name, columns } = body;
    const board_id = uniqid();

    const tasks = columns.map((name) => ({
      _id: uniqid(),
      board_id,
      name,
      sub_tasks: [],
    }));

    await db.collection('board').insertOne({
      _id: board_id,
      name,
      tasks: columns,
    });

    await db.collection('task').insert(tasks);
  }
}

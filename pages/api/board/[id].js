import { connectToDatabase } from '../../../services/mongodb';
import uniqid from 'uniqid';

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { db } = await connectToDatabase();

  if (method === 'GET') {
    const { _id } = query;
    const board = await db.collection('board').find({ _id }).toArray();
    res.status(200).json(board);
  }

  if (method === 'PATCH') {
    const { title, description, status, tasks } = body;
    const task = {
      status: status.name,
      title,
      description,
      tasks,
    };

    console.log(task);
    res.status(200).json({ message: 'Board added to collection' });
  }
}

import { connectToDatabase } from '../../../services/mongodb';
import uniqid from 'uniqid';

export default async function handler(req, res) {
  const { method, body } = req;
  const { db } = await connectToDatabase();

  // create new task
  if (method === 'POST') {
    const { title, description, board_id, column_id, status, subtasks } = body;

    await db.collection('task').insertOne({
      _id: uniqid(),
      board_id,
      column_id,
      status,
      title,
      description,
      subtasks,
    });

    res.status(200).json({ msg: 'task created' });
  }
}

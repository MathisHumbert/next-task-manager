import { connectToDatabase } from '../../../services/mongodb';
import uniqid from 'uniqid';

export default async function handler(req, res) {
  const { method, body } = req;
  const { db } = await connectToDatabase();

  if (method === 'POST') {
    const { title, description, board_id, column_id, status, subtasks } = body;

    const task = await db.collection('task').insertOne({
      _id: uniqid(),
      board_id,
      column_id,
      status,
      title,
      description,
      subtasks,
    });

    res.status(200).json(task);
  }
}

// task: {
//   _id: id,
//   board_id: id,
//   column_id: id,
//   status: column_name,
//   description: '',
//   title: '',
//   subtasks: [{}, {}, {}],
// }

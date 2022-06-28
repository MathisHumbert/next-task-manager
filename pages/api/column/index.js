import { connectToDatabase } from '../../../services/mongodb';
import uniqid from 'uniqid';

export default async function handler(req, res) {
  const { method, body } = req;
  const { db } = await connectToDatabase();

  if (method === 'POST') {
    const { name, board_id } = body;

    const column = await db
      .collection('column')
      .insertOne({ _id: uniqid(), board_id, name, tasks: [] });

    res.status(200).json(column);
  }
}

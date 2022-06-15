import { connectToDatabase } from '../../../services/mongodb';
import uniqid from 'uniqid';

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { db } = await connectToDatabase();

  if (method === 'GET') {
    const boards = await db.collection('board').find().toArray();
    res.status(200).json(boards);
  }

  if (method === 'PUT') {
    const { name, columns } = body;

    const new_columns = columns.map((item) => ({
      name: item.name,
      tasks: [],
      _id: uniqid(),
    }));

    await db
      .collection('board')
      .insertOne({ _id: uniqid(), name, columns: new_columns });

    res.status(200).json({ message: 'Board added to collection' });
  }
}

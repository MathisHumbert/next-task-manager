import { connectToDatabase } from '../../../services/mongodb';
impo;

export default async function handler() {
  const { method, query, body } = req;
  const { db } = await connectToDatabase();

  if (method === 'GET') {
    const { id: boardId } = query;
    const board = await db.collection('task').find({ boardId }).toArray();
    console.log(board);
    res.status(200).json(board);
  }

  if (method === 'POST') {
    const { name, columns } = body;

    const new_columns = columns.map((item) => ({
      name: item.name,
      _id: uniqid(),
    }));

    await db
      .collection('board')
      .insertOne({ _id: uniqid(), name, columns: new_columns });

    res.status(200).json({ message: 'Board added to collection' });
  }
}

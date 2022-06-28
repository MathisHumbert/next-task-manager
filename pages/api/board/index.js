import { connectToDatabase } from '../../../services/mongodb';
import uniqid from 'uniqid';

export default async function handler(req, res) {
  const { method, body } = req;
  const { db } = await connectToDatabase();

  // get all boards
  if (method === 'GET') {
    const boards = await db.collection('board').find().toArray();

    res.status(200).json(boards);
  }

  // create new board
  if (method === 'POST') {
    const { name, board_columns } = body;

    const board_id = uniqid();

    const columns = board_columns.map((item) => ({
      _id: uniqid(),
      board_id,
      name: item.name,
      tasks: [],
    }));

    const board = await db
      .collection('board')
      .insertOne({ _id: board_id, name });

    const columnsAdded = await db.collection('column').insertMany(columns);

    // const tasks = await db.collection('')

    res.status(200).json({ board, columns: columnsAdded });
  }
}

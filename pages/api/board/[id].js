import { connectToDatabase } from '../../../services/mongodb';
import uniqid from 'uniqid';

export default async function handler(req, res) {
  const { method, query } = req;
  const { db } = await connectToDatabase();

  // get a single board
  if (method === 'GET') {
    const { id } = query;

    const board = await db.collection('board').find({ _id: id }).toArray();

    const columns = await db
      .collection('column')
      .find({ board_id: id })
      .toArray();

    const tasks = await db.collection('task').find({ board_id: id }).toArray();

    res.status(200).json({ board, columns, tasks });
  }

  if (method === 'PATCH') {
    const { id } = query;
    const { name, columnsToAdd, columnsToDelete, columnsToEdit } = body;

    if (columnsToAdd.length) {
      const columns = boardToAdd.map((item) => ({
        _id: uniqid(),
        board_id: id,
        name: item.name,
      }));

      await db.collection('column').insertMany(columns);
    }

    if (columnsToDelete.length) {
      columnsToDelete.forEach(async (column) => {
        await db.collection('task').deleteMany({ columnd_id: column.id });

        await db.collection('column').deleteOne({ _id: column.id });
      });
    }

    if (columnsToEdit.length) {
      columnsToEdit.forEach(async (column) => {
        await db.collection('column').findOneAndUpdate(
          { column_id: column._id },
          {
            $set: {
              name: column.name,
            },
          }
        );
      });
    }

    if (name) {
      await db.collection('board').findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name,
          },
        }
      );
    }

    res.status(200).json({ msg: 'board edited' });
  }

  // delete a board
  if (method === 'DELETE') {
    const { id } = query;

    await db.collection('board').deleteOne({ _id: id });

    await db.collection('column').deleteMany({ board_id: id });

    await db.collection('task').deleteMany({ board_id: id });

    res.status(200).json({ msg: 'board deleted' });
  }
}

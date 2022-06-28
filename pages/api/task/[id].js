import { connectToDatabase } from '../../../services/mongodb';

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { db } = await connectToDatabase();

  // get all tasks from a column
  if (method === 'GET') {
    const { id } = query;

    const tasks = await db.collection('task').find({ column_id: id }).toArray();

    res.status(200).json(tasks);
  }

  // update a single task
  if (method === 'PATCH') {
    const { title, description, column_id, status, subtasks } = body;
    const { id } = query;

    const queryOpts = { _id: id };
    const update = {
      $set: {
        title,
        description,
        column_id,
        status,
        subtasks,
      },
    };

    await db.collection('task').findOneAndUpdate(queryOpts, update);

    res.status(200).json({ msg: 'task updated' });
  }

  // delete a task
  if (method === 'DELETE') {
    const { id } = query;

    await db.collection('task').deleteOne({ _id: id });

    res.status(200).json({ msg: 'task deleted' });
  }
}

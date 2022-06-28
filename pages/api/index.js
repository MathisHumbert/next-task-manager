// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}

// board: {
//   _id: id,
//   name: '',
//   columns: [id, id],
// }

// column: {
//  _id: id,
//  board_id: id,
//  name: '',
//  tasks: [id, id],
// }

// task: {
//   _id: id,
//   board_id: id,
//   column_id: id,
//   status: column_name,
//   description: '',
//   title: '',
//   subtasks: [{}, {}, {}],
// }

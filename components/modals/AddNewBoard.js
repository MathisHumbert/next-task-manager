import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import uniqid from 'uniqid';
import axios from 'axios';

import { toggleNewBoard } from '../../features/modal/modalSlice';
import Modal from '../shared/Modal';

export default function AddNewBoard() {
  const [columns, setColumns] = useState([]);
  const [boardName, setBoardName] = useState('');
  const { isAddNewBoardOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAddNewBoardOpen) return;

    setColumns([
      { name: 'To Do', id: uniqid() },
      { name: 'Doing', id: uniqid() },
    ]);
  }, [isAddNewBoardOpen]);

  const handleSubmit = async () => {
    try {
      await axios.post('/api/board', { name: boardName, columns });
      dispatch(toggleNewBoard());
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { value, id } = e.target;

    const newColumns = columns.reduce((acc, curr) => {
      if (curr.id === id) {
        return [...acc, { name: value, id: curr.id }];
      }
      return [...acc, curr];
    }, []);

    setColumns(newColumns);
  };

  const deleteColumn = (id) => {
    const newColumns = columns.reduce((acc, curr) => {
      if (curr.id === id) {
        return acc;
      }
      return [...acc, curr];
    }, []);

    setColumns(newColumns);
  };

  const addColumn = () => setColumns([...columns, { name: '', id: uniqid() }]);

  return (
    <Modal
      isVisible={isAddNewBoardOpen}
      close={() => dispatch(toggleNewBoard())}
    >
      <h3 className='modal__title'>Add New Board</h3>
      <div className='modal__group__container'>
        <label className='modal__label'>Board Name</label>
        <input
          type='text'
          placeholder='e.g. Web Design'
          className='modal__input__text'
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />
      </div>
      <div className='modal__group__container'>
        <label className='modal__label'>Board Columns</label>
        <div>
          {columns.map((item) => (
            <div className='input__text__container' key={item.id}>
              <input
                type='text'
                className='modal__input__text'
                id={item.id}
                value={item.name}
                onChange={handleChange}
              />
              <button
                onClick={() => deleteColumn(item.id)}
                className='modal__delete__column'
                type='button'
              >
                <Image
                  src='/assets/icon-cross.svg'
                  width={15}
                  height={15}
                  layout='fixed'
                  alt='cross'
                />
              </button>
            </div>
          ))}
        </div>
        <button
          className='modal__button__secondary'
          onClick={addColumn}
          type='submit'
        >
          + Add New Column
        </button>
      </div>

      <button className='modal__button__primary__s' onClick={handleSubmit}>
        Create New Board
      </button>
    </Modal>
  );
}

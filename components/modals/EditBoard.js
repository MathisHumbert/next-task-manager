import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import uniqid from 'uniqid';

import { toggleEditBoard } from '../../features/modal/modalSlice';
import Modal from '../shared/Modal';

export default function EditBoard({
  object = [
    { title: 'To Do', id: 'l4eiwo3a' },
    { title: 'Doing', id: 'l4eiwo3b' },
    { title: 'Done', id: 'l4eiwo3c' },
  ],
  name = 'Platform Launch',
}) {
  const [board, setBoard] = useState(object);
  const [boardName, setBoardName] = useState(name);
  const { isEditBoardOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // edit the actual board
  };

  const handleChange = (e) => {
    const { value, id } = e.target;

    const newBoard = board.reduce((acc, curr) => {
      if (curr.id === id) {
        return [...acc, { title: value, id: curr.id }];
      }
      return [...acc, curr];
    }, []);

    setBoard(newBoard);
  };

  const deleteColumn = (id) => {
    const newBoard = board.reduce((acc, curr) => {
      if (curr.id === id) {
        return acc;
      }
      return [...acc, curr];
    }, []);

    setBoard(newBoard);
  };

  const addColumn = () => setBoard([...board, { title: '', id: uniqid() }]);

  return (
    <Modal
      isVisible={isEditBoardOpen}
      close={() => dispatch(toggleEditBoard())}
    >
      <h3 className='modal__title'>Edit Board</h3>
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
          {board.map((item) => (
            <div className='input__text__container' key={item.id}>
              <input
                type='text'
                className='modal__input__text'
                id={item.id}
                value={item.title}
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
        Save Changes
      </button>
    </Modal>
  );
}

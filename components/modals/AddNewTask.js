import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import uniqid from 'uniqid';
import axios from 'axios';

import { toggleNewTask } from '../../features/modal/modalSlice';
import { handleItemChange, deleteItem, addItem } from '../../utils/utils';
import Modal from '../shared/Modal';
import ModalDropdown from './ModalDropdown';

export default function AddNewTask({ id, columns }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState({
    name: columns[0].name,
    _id: columns[0]._id,
  });
  const { isAddNewTaskOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAddNewTaskOpen) return;

    setTasks([
      { name: '', id: uniqid() },
      { name: '', id: uniqid() },
    ]);
  }, [isAddNewTaskOpen]);

  const handleSubmit = async () => {
    try {
      await axios.patch(`/api/board/${id}`, {
        tasks,
        title,
        description,
        status,
      });
      // dispatch(toggleNewTask());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isVisible={isAddNewTaskOpen}
      close={() => {
        dispatch(toggleNewTask());
      }}
    >
      <h3 className='modal__title'>Add New Task</h3>
      <div className='modal__group__container'>
        <label className='modal__label'>Title</label>
        <input
          type='text'
          placeholder='e.g. Take cooffe break'
          className='modal__input__text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='modal__group__container'>
        <label className='modal__label'>Description</label>
        <textarea
          className='modal__input__text modal__input__textarea'
          placeholder='e.g. It’s always good to take a break. This 
15 minute break will  recharge the batteries 
a little.'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='modal__group__container'>
        <label className='modal__label'>Subtasks</label>
        <div>
          {tasks.map((item) => (
            <div className='input__text__container' key={item.id}>
              <input
                type='text'
                className='modal__input__text'
                id={item.id}
                value={item.title}
                onChange={(e) => handleItemChange(e, tasks, setTasks)}
              />
              <button
                onClick={() => deleteItem(item.id, tasks, setTasks)}
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
          onClick={() => addItem(tasks, setTasks)}
          type='submit'
        >
          + Add New Subtask
        </button>
      </div>
      <div className='modal__group__container'>
        <label className='modal__label'>Status</label>
        <ModalDropdown
          columns={columns}
          status={status}
          setStatus={setStatus}
        />
      </div>
      <button className='modal__button__primary__s' onClick={handleSubmit}>
        Create Task
      </button>
    </Modal>
  );
}

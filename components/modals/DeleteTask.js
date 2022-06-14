import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleDeleteTask } from '../../features/modal/modalSlice';
import Modal from '../shared/Modal';

export default function DeleteTask() {
  const { isDeleteBoardTask } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  return (
    <Modal
      // isVisible={isDeleteTaskOpen}
      isVisible={true}
      close={() => dispatch(toggleDeleteTask())}
    >
      <h3 className='modal__title delete'>Delete this board</h3>
      <p className='modal__text'>
        Are you sure you want to delete the NAME board? This action will remove
        all columns and tasks and cannot be reversed.
      </p>
      <button className='modal__button__delete'>Delete</button>
      <button className='modal__button__secondary'>Cancel</button>
    </Modal>
  );
}

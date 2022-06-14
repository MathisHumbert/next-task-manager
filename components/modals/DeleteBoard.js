import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleDeleteBoard } from '../../features/modal/modalSlice';
import Modal from '../shared/Modal';

export default function DeleteBoard() {
  const { isDeleteBoardOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  return (
    <Modal
      isVisible={isDeleteBoardOpen}
      close={() => dispatch(toggleDeleteBoard())}
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

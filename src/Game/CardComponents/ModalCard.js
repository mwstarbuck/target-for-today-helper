import React from 'react';
import TableModal from '../../Modals/TableModal';

const ModalCard = ({setShowModal, actionText}) => {
  return <>
    <button onClick={() => {
      setShowModal(true);
    }}
      className='card__button'>
      {actionText}
    </button></>
}

export default ModalCard;
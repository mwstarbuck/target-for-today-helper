import React from 'react';
import TableModal from '../../Modals/TableModal';

const ModalCard = ({setShowTableModal, actionText}) => {
  return <>
    <button onClick={() => {
      setShowTableModal(true);
    }}
      className='card__button'>
      {actionText}
    </button></>
}

export default ModalCard;
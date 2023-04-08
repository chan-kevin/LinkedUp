import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import ExperienceForm from './ExperienceForm';

function ExperienceFormModal() {
  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
  }

  useEffect(() => {
    const body = document.querySelector('body');
    if (showModal) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  }, [showModal]);
  
  return (
    <>
      <button onClick={() => setShowModal(true)} className='profileButton'><i className="fa-solid fa-plus" id='plusIcon'></i></button>
      {showModal && (
        <Modal onClose={onClose}>
          <ExperienceForm/>
        </Modal>
      )}
    </>
  );
}

export default ExperienceFormModal;
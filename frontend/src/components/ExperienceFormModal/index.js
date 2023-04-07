import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ExperienceForm from './ExperienceForm';

function ExperienceFormModal() {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };
  
  return (
    <>
      <button onClick={() => setShowModal(true)} className='profileButton'><i className="fa-solid fa-plus" id='plusIcon'></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ExperienceForm/>
        </Modal>
      )}
    </>
  );
}

export default ExperienceFormModal;
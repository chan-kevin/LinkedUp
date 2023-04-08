import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import ExperienceForm from '../ExperienceFormModal/ExperienceForm';

function EditFormModal({experience}) {
  const {userId} = useParams();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  // const closeModal = () => {
  //   setShowModal(false);
  // };

  const onClose = () => {
    setShowModal(false);
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
    history.goBack();
  }

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true)
    history.push(`/users/${userId}/experiences/${experience.id}`)
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
    <div id='editButton'>
      <button onClick={openModal} className='addPosition' id='editButton'>
        <i className="fa-solid fa-pen" id="editIcon"></i>
      </button>
      {showModal && (
        <Modal onClose={onClose}>
          <ExperienceForm onClose={onClose} experience={experience}/>
        </Modal>
      )}
    </div>
  );
}

export default EditFormModal;
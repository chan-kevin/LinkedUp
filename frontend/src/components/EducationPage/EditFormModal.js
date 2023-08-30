import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import EducationForm from '../ProfilePage/education';

function EditFormModal({education}) {
  const {userId} = useParams();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
    history.goBack();
  }

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true)
    history.push(`/users/${userId}/educations/${education.id}`)
    window.scrollTo(0,0);
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
      <button onClick={openModal} className='addPosition' id='edit-education'>
        <i className="fa-solid fa-pen" id="editIcon"></i>
      </button>
      {showModal && (
        <Modal onClose={onClose}>
          <EducationForm onClose={onClose} education={education}/>
        </Modal>
      )}
    </div>
  );
}

export default EditFormModal;
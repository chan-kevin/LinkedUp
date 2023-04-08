import React, { useState } from 'react';
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
    history.goBack();
  }

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true)
    history.push(`/users/${userId}/experiences/${experience.id}`)
  }
  

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
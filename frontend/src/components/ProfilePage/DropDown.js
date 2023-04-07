import React, { useState, useEffect } from "react";
import ExperienceFormModal from "../ExperienceFormModal";
import './Profile.css'
import { Modal } from "../../context/Modal";
import ExperienceForm from "../ExperienceFormModal/ExperienceForm";

function DropDown() {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditMenu, setEditShowMenu] = useState(false);
  
  const openMenu = (e) => {
    if (showMenu) return;
    e.stopPropagation();
    setShowMenu(true);
  };

  const openEditMenu = (e) => {
    if (showEditMenu) return;
    e.stopPropagation();
    setEditShowMenu(true);
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  useEffect(() => {
    if (!showEditMenu) return;

    const closeEditMenu = () => {
      setEditShowMenu(false);
    };

    document.addEventListener('click', closeEditMenu);

    return () => document.removeEventListener('click', closeEditMenu);
  }, [showEditMenu]);

  const onClose = () => {
    setShowModal(false);
  };

  const openModal = (e) => {
    e.stopPropagation();
    setShowModal(true);
    setShowMenu(false);
    setEditShowMenu(false);
  };

  return (
    <>
    <div className="positionDrop">
      <div className="button">
        <button onClick={openMenu} className='addPosition'>
          <i className="fa-solid fa-plus" id='plusIcon'></i>
        </button>

        <button onClick={openEditMenu} className='addPosition'>
          <i class="fa-solid fa-pen" id="editIcon"></i>
        </button>
      </div>

      {showMenu && (
        <div id="positionDrop">
          <button onClick={openModal} id='modalButton'>
            <div className="positionButton"><i class="fa-solid fa-briefcase" id="addPositionButton"></i>Add Position</div>
          </button>
        </div>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ExperienceForm onClose={onClose} />
        </Modal>
      )}
      </div>
    </>
  );
}

export default DropDown;

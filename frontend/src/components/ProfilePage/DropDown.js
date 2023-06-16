import React, { useState, useEffect } from "react";
import './Profile.css'
import { Modal } from "../../context/Modal";
import ExperienceForm from "../ExperienceFormModal/ExperienceForm";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function DropDown() {
  const { userId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  
  const openMenu = (e) => {
    if (showMenu) return;
    e.stopPropagation();
    setShowMenu(true);
  };

  const history = useHistory();

  const goEditPage = (e) => {
    e.preventDefault();
    history.push(`/users/${userId}/experiences`)
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const onClose = () => {
    setShowModal(false);
  };

  const openModal = (e) => {
    e.stopPropagation();
    setShowModal(true);
    setShowMenu(false);
  };

  return (
    <>
    {sessionUser ? (
    <div className="positionDrop">
      <div className="button">
        <button onClick={openMenu} className='addPosition'>
          <i className="fa-solid fa-plus" id='plusIcon'></i>
        </button>

      {location.pathname === `/users/${userId}` ? (
        <button onClick={goEditPage} className='addPosition'>
          <i className="fa-solid fa-pen" id="editIcon"></i>
        </button>
      ) : null}
      </div>

      {showMenu && (
        <div id="positionDrop">
          <button onClick={openModal} id='modalButton'>
            <div className="positionButton"><i className="fa-solid fa-briefcase" id="addPositionButton"></i>Add Position</div>
          </button>
        </div>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ExperienceForm onClose={onClose} />
        </Modal>
      )}
      </div>
      ) : null}
    </>
  );
}

export default DropDown;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../store/editSlice';
import { closeModal } from '../store/editSlice';
import {getUserProfile} from '../store/userSlice'



const UserNameModal = () => {

    const [userName, setUserName] = useState("");
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    
    
    const handleCloseModal = () => {
      dispatch(closeModal());
    };
    
    const handleEditSubmit = async (e) => {
      e.preventDefault();
      const editUserName = {userName};
      await dispatch(updateUserProfile(editUserName)).then((result) => {
        if(result.payload) {
          setUserName('');
          dispatch(getUserProfile(token))
          dispatch(closeModal());

        };

      });
    };

    
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={handleCloseModal}>
          &times;
        </span>
        <h2>Modifier le nom d'utilisateur</h2>
        <form onSubmit={handleEditSubmit}>
          <div className="input-wrapper">
          <label htmlFor='username'>Nouveau nom d'utilisateur:</label>
          <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              id = 'username'
            />
            </div>
          <button className="editsubmit-button" type="submit">Enregistrer</button>
        </form>
      </div>
    </div>
  );
};

export default UserNameModal;
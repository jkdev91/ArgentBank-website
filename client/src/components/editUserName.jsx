import React from 'react';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../store/userSlice';

const Edit = () => {

  const user = useSelector((state) => state.user.user);

  return (
    <div className="header">
      { user &&
        <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
      }
        <button className="edit-button">Edit Name</button>
      </div>
  );
};

export default Edit;
import React from 'react';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../store/userSlice';

const Edit = () => {


  return (
    <div className="header">
        <h1>Welcome back<br />Tony Jarvis!</h1>
        <button className="edit-button">Edit Name</button>
      </div>
  );
};

export default Edit;
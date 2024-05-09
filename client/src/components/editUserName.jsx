
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../store/editSlice';
import UserNameModal from './editFormModal';



const Edit = () => {

  const user = useSelector((state) => state.user.user);
  const isModalOpen = useSelector((state) => state.useredit.isModalOpen);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };
 

    return (
      <div className="header">
        { user &&
          <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
        }
          <button className="edit-button" onClick={handleOpenModal}>Edit Name</button>
          {isModalOpen && <UserNameModal />}
        </div>
    );
 
};

export default Edit;
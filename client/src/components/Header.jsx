import { Link, useNavigate, useLocation } from "react-router-dom";
import UserNavLink from "./UserNavLink";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { clearUser } from "../store/userSlice";
import { useState, useEffect } from "react";
import { persistor } from "../store/store";


function Header() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const userData = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoggedIn(!!userData);
      }, [userData]);
    
    const handleLogout = () => {
        dispatch(logout()); // dispatcher l'action de déconnexion
        dispatch(clearUser()); // effacer les données de l'utilisateur du store 
        sessionStorage.clear();
        persistor.purge(); // purger l'état persisté
    };
    
    return (
        <header>
            <nav className="main-nav">
                <Link to="/" className="main-nav-logo">
                    <img
                    className="main-nav-logo-image"
                    src="./img/argentBankLogo2.webp"
                    alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    {isLoggedIn ? (
                        <>
                         <UserNavLink username= {userData && userData.userName} />
                     <Link className="main-nav-item" to="/" onClick={handleLogout} >
                     <i className="fa fa-sign-out"></i>
                       Sign out
                     </Link>
                     </>   
                    ) : (
                     <Link className="main-nav-item" to="/Login">
                     <i className="fa fa-user-circle"></i>
                      Sign in
                     </Link>
                    ) }  
                </div>
            </nav>
        </header>
    );
}

export default Header
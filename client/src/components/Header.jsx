import { Link, useNavigate, useLocation } from "react-router-dom";
import UserNavLink from "./UserNavLink";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { clearUserData } from "../store/userSlice";
import { useState, useEffect } from "react";


function Header() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(!!user);
      }, [user]);
    
    const handleLogout = () => {
        dispatch(logout()); // dispatcher l'action de déconnexion
        dispatch(clearUserData()); // effacer les données de l'utilisateur du store 
        // navigate("/"); // Rediriger l'utilisateur vers la page d'accueil
    };
    
    return (
        <header>
            <nav className="main-nav">
                <Link to="/" className="main-nav-logo">
                    <img
                    className="main-nav-logo-image"
                    src="./img/argentBankLogo1.png"
                    alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    {isLoggedIn ? (
                        <>
                         <UserNavLink username= {user.userName} />
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
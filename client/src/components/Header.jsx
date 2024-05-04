import { Link, useLocation } from "react-router-dom";
import UserNavLink from "./UserNavLink";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


function Header() {

    const location = useLocation();
    const [isUserSignedIn, setisUserSignedIn] = useState(false);
    const [token, setToken] = useState(null);
    
    const user = useSelector((state) => state.user.user);
    console.log(user)
    
    useEffect(() => {
        const storedToken = localStorage.getItem("user");
        setToken(storedToken);
        setisUserSignedIn(!!storedToken);
    }, []);
    
    
    useEffect(() => {
        const storedToken = localStorage.getItem("user");
        setisUserSignedIn(!!storedToken);
    }, [location.pathname]); 
    
    
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
                    {isUserSignedIn && location.pathname === "/Userprofil" ? (
                        <>
                        {user && <UserNavLink username= {user.userName} />}
                     <Link className="main-nav-item" to="/" onClick={() => {
                        localStorage.removeItem("user");
                        setisUserSignedIn(false)
                     }}>
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
    )
}

export default Header
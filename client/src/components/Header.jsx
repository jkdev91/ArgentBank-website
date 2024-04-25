import { Link } from "react-router-dom"

function Header() {
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
                <Link className="main-nav-item" to="/Login">
                    <i className="fa fa-user-circle"></i>
                    Sign
                </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header
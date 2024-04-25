import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Homepage.jsx";
import Login from "./pages/Loginpage.jsx";
import Userprofil from "./pages/Userpage.jsx";
import "./styles/styles.css"

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Login" element={<Login />} />
        <Route path="Userprofil" element={<Userprofil />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

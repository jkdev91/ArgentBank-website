import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../store/authSlice';
import { getUserProfile } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

// const token = localStorage.getItem('user');

function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const {loading, error} = useSelector((state)=>state.auth)
    const userCredentiels = {}

   const dispatch = useDispatch()
   const navigate = useNavigate()

   // logique de connexion vers la page user
    const handleLoginEvent = async(e) => {
        e.preventDefault();
        let userCredentiels = { 
            email, password
        };
        try {
        await dispatch(loginUser(userCredentiels)).then((result)=>{
            if(result.payload) {
                setEmail('');
                setPassword('');
                navigate('/Userprofil');
                dispatch(getUserProfile(result.payload));
            }
        });
        } catch (error) {
            console.error(error);
        }
    };



    return (
    <>
        <main className="main bg-dark">
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleLoginEvent}>
            <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me" value={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            {/*<!-- PLACEHOLDER DUE TO STATIC SITE --> */}
            {/* <a href="./Userprofil" className="sign-in-button">Sign In</a> */}
            {/*<!-- SHOULD BE THE BUTTON BELOW --> */}
            <button className="sign-in-button">
                {loading?'Loading...' : 'Sign In'}
            </button>
            {/*<!--  --> */}
            {error&&(
                <div className='alert' role='alert'>{error}</div>
            )}
            </form>
        </section>
        </main>
    </>         
    )
}

export default LoginPage
import React, { useState, useRef, useEffect } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/Validate'
import { auth } from '../utils/Firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';


const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true)
    const [errorMsg, setErrorMsg] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const email = useRef(null)
    const password = useRef(null)
    const name = useRef(null)
    useEffect(() => {
        document.title = isSignIn ? "NetFlix | Sign in" : "NetFlix | Sign up";
    }, [isSignIn]);
    const handleBtnClick = () => {
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMsg(message)

        if (!isSignIn) {
            //Sign Up Form
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/164729969?v=4"
                    }).then(() => {
                        const { email, uid, displayName,photoURL } = auth.currentUser;
                        dispatch(addUser({ email, uid, displayName,photoURL }))
                        navigate('/browse')
                    }).catch((error) => {
                        setErrorMsg(error.message)
                    });
                    navigate('/browse')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(errorCode + '-' + errorMessage)
                });
        }
        else {
            //sign in form 
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    navigate('/browse')

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(errorCode + '-' + errorMessage)

                });

        }
    }

    const toggleButton = () => {
        setIsSignIn(!isSignIn)
        setErrorMsg(null)
    }
    return (
        <div className='relative text-white font-semibold'>
            <Header />
            <img className='w-screen h-screen' src='https://assets.nflxext.com/ffe/siteui/vlv3/41c789f0-7df5-4219-94c6-c66fe500590a/3149e5eb-4660-4e3d-9e65-b1e615229c64/IN-en-20240513-popsignuptwoweeks-perspective_alpha_website_large.jpg' />
            <form onSubmit={(e) => e.preventDefault()} className='w-3/12 h-fit rounded-md flex flex-col  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black  bg-opacity-70 p-10'>
                <h1 className='font-semibold mb-5 text-2xl'>{isSignIn ? "Sign in" : "Sign up"}</h1>
                {!isSignIn && <input
                    type="text"
                    ref={name}
                    placeholder="Enter your Fullname "
                    className="p-4 my-3 border-gray-700 w-full bg-gray-700"
                />}
                <input
                    ref={email}
                    type="email"
                    placeholder="Enter your Email "
                    className="p-4 my-3 border-gray-700 w-full bg-gray-700"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Enter your Password"
                    className="p-4 my-3 w-full bg-gray-700"
                />
                <p className='text-red-500 p-2 font-bold'>{errorMsg} </p>
                <button onClick={handleBtnClick} className="p-4   bg-red-700 font-bold text-lg w-full rounded-lg">{isSignIn ? "Sign in" : "Sign up"} </button>
                <p onClick={toggleButton} className=' cursor-pointer text-red-600  text-center mt-7 mb-5 font-semibold'>
                    {isSignIn ? "New to Netflix? Sign Up Now" : "Already Registered , Sign In!"}
                </p>
            </form>
        </div>
    )
}

export default Login
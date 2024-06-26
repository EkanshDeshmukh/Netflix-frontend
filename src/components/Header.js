import React, { useEffect } from 'react';
import { auth } from '../utils/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
    const dispatch = useDispatch()
    const user = useSelector(store => store.user)
    const navigate = useNavigate();

    const handleSignout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/');
        }).catch((error) => {
            // An error happened.
            console.error("Sign out error", error);
        });
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user
                dispatch(addUser({
                    uid, email, displayName
                }))
                navigate('/browse')
            }
            else {
                dispatch(removeUser())
                navigate('/')
            }
        })

        //unsubscribe when component unmount
        return () => unsubscribe();
    }, [])

    return (
        <div className="flex w-screen items-center justify-between absolute top-0 z-10 p-4 bg-transparent">
            <img
                className="w-44"
                src={LOGO} alt="logo"
            />
            {user && <button
                onClick={handleSignout}
                className="text-zinc-300  cursor-pointer font-bold bg-red-700 px-5 py-3 rounded mr-10"
            >
                Sign Out
            </button>}
        </div>
    );
};

export default Header;

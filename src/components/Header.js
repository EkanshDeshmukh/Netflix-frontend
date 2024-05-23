import React from 'react';
import { auth } from '../utils/Firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
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

    return (
        <div className="flex w-screen items-center justify-between absolute top-0 z-10 p-4 bg-transparent">
            <img
                className="w-44"
                src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                alt="logo"
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

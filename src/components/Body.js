import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Browse from './Browse'
import Login from './Login'
import { auth } from '../utils/Firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'

const Body = () => {
    const dispatch = useDispatch()

    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/browse',
            element: <Browse />
        }
    ])
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                //whenever user sign in
                const { email, uid, displayName,photoURL } = user;
                dispatch(addUser({ email, uid, displayName,photoURL }))
            } else {
                dispatch(removeUser())
            }
        });
    }, [])
    return (
        <div>
            <RouterProvider router={appRouter}></RouterProvider>
        </div>
    )
}

export default Body
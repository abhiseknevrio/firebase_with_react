import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useFirebase } from '../context/firebase';

const Header = ({ isAuthenticated }) => {

    const firebase = useFirebase()

    return (
        <header>
            <Link to={"/"}><img src='https://images.pexels.com/photos/57409/ford-mustang-stallion-red-57409.jpeg?auto=compress&cs=tinysrgb&w=100&h=75&dpr=1' alt='logo' /></Link>
            <nav>
                {
                    isAuthenticated ?
                        <>
                            <Link to="/">Profile</Link>
                            <Link to="/collections">Collection</Link>
                            <button onClick={firebase.signOutHandler}>Sign Out</button>
                        </>
                        :
                        <>
                            <Link to="/">Home</Link>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                }
            </nav>
        </header>
    )
}

export default Header
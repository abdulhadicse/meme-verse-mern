import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({setIsLoggedIn}) => {
    
    const logoutSubmit = ()=>{
        localStorage.clear();
        setIsLoggedIn(false);
    }
    
    return (
        <>
            <header>
                <div className="logo">
                    <h1> <Link to="/">MemeVerse</Link> </h1>
                </div>

                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/create">Upload Meme</Link></li>
                    <li onClick={logoutSubmit}><Link to="/">Logout</Link></li>
                </ul>
            </header>
        </>
    );
};

export default Nav;
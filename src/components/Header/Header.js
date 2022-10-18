import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import logo from '../../images/Logo.svg'
import './Header.css'

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    return (
        <div className='header'>
            <img src={logo} alt="" />
            <div>
                <NavLink className={({ isActive }) => isActive ? 'active' : undefined} to="/shop">Shop</NavLink>
                <NavLink to="/orders">Orders</NavLink>
                <NavLink to="/inventory">Inventory</NavLink>
                <NavLink to="/about">About</NavLink>
                {
                    user?.uid ? <>
                        <span className='user'>{user.email}</span>
                        <button onClick={logOut} className='btn-singout'>Sign Out</button>
                    </> :
                        < >
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/signup">Sign up</NavLink>
                        </>
                }

            </div>
        </div>
    );
};

export default Header;
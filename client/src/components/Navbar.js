import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    
    const logoutHandler = e => {
        e.preventDefault()

        auth.logout()

        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper">
                <a href="/" className="brand-logo">Link Shortener</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create link</NavLink></li>
                    <li><NavLink to="/links">My links</NavLink></li>
                    <li><a to="/" onClick={ logoutHandler }>Logout</a></li>
                </ul>
            </div>
        </nav>
    )
}
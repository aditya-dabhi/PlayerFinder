import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import {AuthContext} from '../../AuthContext'

const Navbar = () => {

    const [auth, setAuth] = useContext(AuthContext)

    return(
        <div>
            <nav className="navbar">
                <div class="navbar__logo">
                    <Link to="/" className="navbar__links">
                        <h3>Logo</h3>   
                    </Link>
                </div>
                    <ul className="navbar__navmenu">
                        {auth
                            ? <>
                                <li className="navbar__navlinks">Event List</li>
                                <Link to="/logout" className="navbar__links">
                                    <li className="navbar__navlinks">Logout</li>
                                </Link>
                                </>
                            : <>
                                 <Link to="/login" className="navbar__links">
                                    <li className="navbar__navlinks">Login</li>
                                </Link>
                                <Link to="/signup" className="navbar__links">
                                    <li className="navbar__navlinks">Register</li>
                                </Link>
                                </>
                        }
                    </ul>
            </nav>
        </div>
    )
}

export default Navbar
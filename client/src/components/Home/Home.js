import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import homegif from './homegif.gif'
import {AuthContext} from '../../AuthContext'
const Home = () => {
    const [auth, setAuth] = useContext(AuthContext)
    return(
        <div className="home">
            <div className="home__info">
                <h1>Search for players to play your favourite sport</h1>
                <p>Pick a day, time, and place to play any sport with someone or group of people.</p>
                <div className="home__button">
                    <Link to="/signup" className="home__links">
                        <button className="btn">Register</button>
                    </Link>
                    {auth ? <button className="btn">See Events</button> : null}
                </div>
            </div>
            <div className="home__decor">
                <img src={homegif} alt="homegif" height="500vw" width="600vw"/>
            </div>
        </div>
    )
}

export default Home
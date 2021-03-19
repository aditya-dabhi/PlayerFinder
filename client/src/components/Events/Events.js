import React, { useState, useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import axios from '../../axios'

const Events = () => {
    const [events, setEvents] = useState([])
    let tempEvents = []
    useEffect(() => {
        getEvents()
    },[])
    const getEvents = () => {
        axios.get('/api/events/all',{
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        .then(res => {
            setEvents(res.data)
        })
        .catch(err => console.log(err))
    }
    return (
        <div>
            {console.log(events)}
            {events.map(event => <h1>{event.typeofsport}</h1>)}
        </div>
    )
}

export default withRouter(Events)
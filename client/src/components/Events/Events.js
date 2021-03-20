import React, { useState, useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import axios from '../../axios'

const Events = (props) => {
    const [events, setEvents] = useState([])
    const choice = props.match.path
    useEffect(()=> {
        console.log("#")
        if(choice === "/events") {
            const url = "api/events/all"
            getEvents(url)
        }
        if(choice === "/your_events") {
            const url = "api/events/user/"+JSON.parse(localStorage.getItem('token')).id
            getEvents(url)
        }
    },[choice])
    const getEvents = (url) => {
        axios.get(url,{
            headers: {
                'auth-token': JSON.parse(localStorage.getItem('token')).tokenID
            }
        })
        .then(res => {
            setEvents(res.data)
        })
        .catch(err => console.log(err))
    }
    return (
        <div>
            
            {events.map(event => <h1>{event.typeofsport}</h1>)}
        </div>
    )
}

export default withRouter(Events)
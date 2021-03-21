import { makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {withRouter} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import axios from '../../axios'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import DateFormat from 'dateformat'
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "7vh",
        marginLeft: "7vw",
        marginRight: "7vw"
    },
    chip: {
        margin: theme.spacing(1)
    }
}))

const EventInfo = props => {
    const [event, setEvent] = useState({})
    const classes = useStyles()
    const eventID = props.match.params.id
    let history = useHistory()
    
    useEffect(()=>{
        const getData = async() => {
            await getEvent()
        }
        getData()
    },[event])
    const getEvent = () => {
        axios.get(`api/events/event/${eventID}`,{
            headers: {
                'auth-token': JSON.parse(localStorage.getItem('token')).tokenID
            }
        })
        .then(res => setEvent(res.data))
        .catch(err => console.log(err))
    }

    const handleClick = () => {
        //event.preventDefault()
        axios.put(`api/events/${eventID}/join`,{},{
            headers:{
                'auth-token': JSON.parse(localStorage.getItem('token')).tokenID
            }
        })
        .then(res => history.push(`/eventinfo/${eventID}`))
        .catch(err => alert(err))
    }

    return(
        <div className={classes.root}>
            <h1>{event.nameofevent}</h1>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                    <Card>
                        <CardContent>
                            <div>
                                <h4>Sport : {event.typeofsport}</h4>
                                <h4>Total Number of Players : {event.numberofplayers}</h4>
                                <h4>Address : {event.address}</h4>
                                <h4>Description : {event.description}</h4>
                                <h4>Date : {DateFormat(event.date, "dS mmmm, yyyy")}</h4>
                                <h4>Time : {event.time}</h4>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Card>
                        <CardContent>
                            <div>
                                <Button variant="contained" color="primary" onClick={handleClick}>Join Now</Button>
                                <h4 style={{float: "right"}}>{event.numberofplayers - (event.listofplayers !== undefined ? event.listofplayers.length:0)} spots let</h4>
                                <h2 style={{backgroundColor:"lightcyan"}}>Players Joined</h2>
                                {event.listofplayers !== undefined ? event.listofplayers.map(player => (
                                    <Chip className={classes.chip} label={player.name} />
                                )): null}
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Card>
                        <CardContent>
                            <div>
                                <h3>Comments</h3>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(EventInfo)
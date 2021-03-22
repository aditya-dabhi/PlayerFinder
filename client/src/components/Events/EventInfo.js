import { makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {withRouter, useHistory} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import axios from '../../axios'
import Card from '@material-ui/core/Card';
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
    },
    button: {
        marginRight: "5px"
    },
    commentBox: {
        width: "100%"
    }
}))

const EventInfo = props => {
    const [event, setEvent] = useState({})
    const [commentText, setCommentText] = useState('')
    const classes = useStyles()
    let history = useHistory()
    const eventID = props.match.params.id
    useEffect(()=>{
        const getData = () => {
            getEvent()
        }
        getData()
    },[])
    const getEvent = () => {
        axios.get(`api/events/event/${eventID}`,{
            headers: {
                'auth-token': JSON.parse(localStorage.getItem('token')).tokenID
            }
        })
        .then(res => setEvent(res.data))
        .catch(err => console.log(err))
    }

    const handleComment = e => {
        e.preventDefault()
        axios.post(`api/events/comment/${eventID}`,{
            text: commentText
        },{
            headers:{
                'auth-token': JSON.parse(localStorage.getItem('token')).tokenID
            }
        })
        .then(res => setEvent(res.data.event))
        .catch(err => console.log(err))
    }

    const handleDelete = () => {
        axios.delete(`api/events/delete/${eventID}`,{
            headers:{
                'auth-token': JSON.parse(localStorage.getItem('token')).tokenID   
            }
        })
        .then(res => history.push('/events'))
        .catch(err => console.log(err))
    }

    const handleJoin = () => {
        //event.preventDefault()
        axios.put(`api/events/${eventID}/join`,{},{
            headers:{
                'auth-token': JSON.parse(localStorage.getItem('token')).tokenID
            }
        })
        .then(res => setEvent(res.data.event))
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
                                {event.user === undefined ? null : JSON.parse(localStorage.getItem('token')).id === event.user._id ? 
                                    <Button className={classes.button} variant="contained" color="secondary" onClick={handleDelete}>Delete</Button> 
                                    :
                                    <Button className={classes.button} variant="contained" color="primary" onClick={handleJoin}>Join Now</Button>
                                }
                                <h4 style={{float: "right"}}>{event.numberofplayers - (event.listofplayers !== undefined ? event.listofplayers.length:0)} spots let</h4>
                                <h2>Players Joined</h2>
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
                                <form onSubmit={handleComment}>
                                    <TextField className={classes.commentBox} label="Add your comment" onChange={({target}) => setCommentText(target.value)}></TextField>
                                    <Button type="submit" style={{marginTop:"15px", marginBottom:"15px"}} variant="contained">Comment</Button>
                                </form>
                            </div>
                            {event.comments !== undefined ? event.comments.map(comment => (
                                <div>
                                    <hr />
                                    <h5>{comment.name}, {DateFormat(comment.date, "dS mmmm, yyyy, HH:MM")}</h5>
                                    <h4>{comment.text}</h4>
                                </div>
                            )):null}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(EventInfo)
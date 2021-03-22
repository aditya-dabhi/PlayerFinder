import React, { useState, useEffect } from 'react'
import {withRouter, Link} from 'react-router-dom'
import axios from '../../axios'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow:1,
      padding: theme.spacing(2)
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }));

const Events = (props) => {
    const [events, setEvents] = useState([])
    const choice = props.match.path
    const classes = useStyles();
    useEffect(()=> {
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
        <div className={classes.root}>
            <Grid container spacing={3}>
                {events.map((event) => (
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2" className={classes.pos}>
                                    {event.nameofevent}
                                </Typography>
                                <Typography color="textSecondary" className={classes.pos}>
                                    {`Sport : ${event.typeofsport}`}
                                </Typography>
                                <Typography color="textSecondary" className={classes.pos}>
                                    {`Max Players: ${event.numberofplayers}`}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/eventinfo/${event._id}`} style={{textDecoration: "none"}}>
                                    <Button variant="contained" size="small" color="primary">More Info</Button>
                                </Link>
                            </CardActions>
                        </Card> 
                    </Grid>       
                ))} 
            </Grid>
        </div>
    )
}

export default withRouter(Events)
import React, { useState } from 'react'
import { withRouter } from 'react-router'
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from '../../axios'

const useStyles = makeStyles((theme) => ({
    createEvent: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    link: {
      cursor: 'pointer'
    }
  }));

const CreateEvent = () => {
    const [title, setTitle] = useState('')
    const [sport, setSport] = useState('')
    const [playerCount, setPlayerCount] = useState(0)
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState('')
    const classes = useStyles()
    let history = useHistory()

    const handleCreate = event => {
        event.preventDefault()
        axios.post('api/events/create', {
            nameofevent: title,
            typeofsport: sport,
            numberofplayers: playerCount,
            address: address,
            description: description,
            date: date,
            time: time
        },{
            headers: {
                'auth-token': JSON.parse(localStorage.getItem('token')).tokenID
            },
        })
        .then(response => history.push('your_events'))
        .catch(err => console.log(err))
    }
    return (
        <div>
            <Container component="main" maxWidth="xs">
                <div className={classes.createEvent}>
                    <h1>Create New Event</h1>
                    <form className={classes.form} noValidate onSubmit = {handleCreate}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        value={title}
                        label="Title"
                        name="title"            
                        onChange={({ target }) => setTitle(target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="sport"
                        value={sport}
                        label="Sport"
                        name="sport"            
                        onChange={({ target }) => setSport(target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="playercount"
                        value={playerCount}
                        label="Number of Players"
                        name="playercount"            
                        onChange={({ target }) => setPlayerCount(target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        value={address}
                        label="Address"
                        name="address"            
                        onChange={({ target }) => setAddress(target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        value={description}
                        label="Description"
                        name="description"            
                        onChange={({ target }) => setDescription(target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="time"
                        value={time}
                        label="Time"
                        name="time"            
                        onChange={({ target }) => setTime(target.value)}
                    />
                    <label>Date</label><br />
                    <DatePicker 
                        minDate={new Date()}
                        selected={date}
                        dateFormat={'MM/dd/yyyy'}
                        onChange={date => setDate(date)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create
                    </Button>
                    </form>
                </div>
            </Container>
        </div>
    )
}

export default withRouter(CreateEvent)
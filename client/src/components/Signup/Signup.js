import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import axios from '../../axios'

const useStyles = makeStyles((theme) => ({
    signup: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
    },
  }));
  

const Signup = () => {

    const classes = useStyles();
    let history = useHistory()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errors,setErrors] = useState('')
    

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/api/users/register',{
          name:name,
          email:email,
          password:password
        })
        .then(response => history.push('/login'))
        .catch(err => {
          setErrors(err.response.data)
        })
    }

    const handleClick = () => {
      history.push('/login')
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.signup}>
                <h1>Sign Up</h1>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"  
                    autoFocus 
                    onChange={({ target }) => setName(target.value)}       
                    error={errors.name ? true : false}
                    helperText={errors.name}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"            
                    onChange={({ target }) => setEmail(target.value)}
                    error={errors.email ? true : false} 
                    helperText={errors.email}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={({ target }) => setPassword(target.value)}
                    error={errors.password ? true : false}
                    helperText={errors.password}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>   
                <Grid container>
                  <Grid item>
                    <Link onClick = {handleClick} variant="body2" className = {classes.link}>
                      {"Already have an account? Login"}
                    </Link>
                  </Grid>
                </Grid>       
                </form>
            </div>
        </Container>
    )
}

export default Signup
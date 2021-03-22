import React, { useState, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import axios from '../../axios'
import {AuthContext} from '../../AuthContext'

const useStyles = makeStyles((theme) => ({
    login: {
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

const Login = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const classes = useStyles()
    let history = useHistory()
    const [auth, setAuth] = useContext(AuthContext)

    const handleLogin = event => {
        event.preventDefault()
        axios.post('api/users/login',{
            email:email,
            password:password
        })
        .then(response => {
            localStorage.setItem("token",JSON.stringify(response.data))
            setAuth(true)
            history.push('/')
        })
        .catch((err) => {
            setErrors(err.response.data)
        })
    }

    const handleClick = () => {
        history.push('/signup')
    }

    return(
        <div>
            <Container component="main" maxWidth="xs">
                <div className={classes.login}>
                    <h1>Login</h1>
                    <form className={classes.form} noValidate onSubmit = {handleLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        value={email}
                        label="Email"
                        name="email"            
                        autoFocus
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
                        value={password}
                        label="Password"
                        type="password"
                        id="password"
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
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                        <Link onClick = {handleClick} variant="body2" className = {classes.link}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                        </Grid>
                    </Grid>
                    </form>
                </div>
            </Container>
        </div>
    )
}

export default Login
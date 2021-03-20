import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {AuthContext} from './AuthContext'


const ProtectedRoute = props => {
    const [auth, setAuth] = useContext(AuthContext);
    console.log(props)
    return auth ? <Route {...props} /> : <Redirect to="/" />
}

export default ProtectedRoute
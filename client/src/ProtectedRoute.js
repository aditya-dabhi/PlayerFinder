import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {AuthContext} from './AuthContext'


const ProtectedRoute = props => {
    const [auth, setAuth] = useContext(AuthContext);
    return auth ? <Route {...props} /> : <Redirect to="/" />
}

export default ProtectedRoute
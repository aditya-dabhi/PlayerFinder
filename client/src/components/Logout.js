import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../AuthContext'

const Logout = () => {
    const [auth,setAuth] = useContext(AuthContext)
    let history = useHistory()
    if(auth){
        localStorage.removeItem('token')
        setAuth(false)
    }
    else    
        history.push('/')
    return(
        <div></div>
    )
}

export default Logout
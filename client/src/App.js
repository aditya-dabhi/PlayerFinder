import React, {useState} from 'react'
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Logout from './components/Logout';
import {AuthProvider} from './AuthContext'
import ProtectedRoute from './ProtectedRoute';
import Events from './components/Events/Events';
import CreateEvent from './components/Events/CreateEvent';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/events" exact component={Events}/>
            <ProtectedRoute path="/create_event" exact component={CreateEvent}/>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

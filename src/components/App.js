import React, { useState } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AuthContext from '../context/AuthContext';
import Home from './Home';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Protected from './Protected';
import '../App.css';


function App() {

    const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') === 'true' ? true : false);
    const [token, setToken] = useState(localStorage.getItem('token'));

    function handleLogin(token) {
        if (token) {
            setAuthenticated(true);
            setToken(token);
        } else {
            setAuthenticated(false);
            setToken(null);
        }
    }

    function handleLogout(event) {
        event.preventDefault();
        setAuthenticated(false);
        setToken(null);
        localStorage.setItem('authenticated', false);
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{authenticated: authenticated, token: token, login: handleLogin}}>
            <BrowserRouter>
                <div className="App">
                    <header>
                        <nav>
                            <a href="/">Home</a>
                            {authenticated ? <a href="/protected">Protected</a> : null}
                            {authenticated ?
                                <a href="/logout" onClick={(e) => handleLogout(e)}>Logout</a> :
                                <a href="/login">Login</a>
                            }
                        </nav>
                    </header>
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/login' component={Login} />
                        <PrivateRoute path="/protected">
                            <Protected />
                        </PrivateRoute>
                    </Switch>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;

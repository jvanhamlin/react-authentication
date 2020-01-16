import React, { useContext, useState, useEffect } from 'react';
import {useHistory, useLocation, withRouter} from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

function Login() {

    const auth = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    useEffect(() => {
        if (auth.authenticated) {
            history.replace(from);
        }
    });

    function handleSubmit(callback, event) {
        event.preventDefault();
        setError(null);
        axios({
            method: 'post',
            url: 'http://localhost:8081/authenticate',
            headers: {
                'username': username,
                'password': window.btoa(password),
            },
        }).then((response) => {
            if (response.data.error) {
                setError(response.data.error.error);
            } 
            if (response.data.token) {
                localStorage.setItem('authenticated', true);
                localStorage.setItem('token', response.data.token.token);
                localStorage.setItem('dateCreated', response.data.token.dateCreated);
                localStorage.setItem('expireTime', response.data.token.expireTime);
                localStorage.setItem('username', response.data.token.username);
                callback(response.data.token.token);
                history.replace(from);
            }
        }).catch((error) => {
            setError('Unable to communicate with the authentication service.')
            console.error(error);
        });
    }

    return (
        <AuthContext.Consumer value={{login: handleSubmit}}>
            {(auth) => (
                <div>
                    <h1>Login</h1>
                    <p>
                        Authenticated: {auth.authenticated === true ? 'true' : 'false'}<br />
                        Token: {auth.token ? auth.token : 'null'}
                    </p>
                    {error &&
                        <p style={{color: 'red'}}>{error}</p>
                    }
                    <form>
                        <label>Username</label>
                        <input onChange={(e) => setUsername(e.target.value)}/><br/>

                        <label>Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}/><br/>
                        <br/>
                        <button type="submit" onClick={(e) => handleSubmit(auth.login, e)}>Login</button>
                    </form>
                </div>
            )}
        </AuthContext.Consumer>
    );
}

export default withRouter(Login);

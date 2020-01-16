import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Protected() {
    const auth = useContext(AuthContext);

    return(
        <div>
            <h1>Protected</h1>
            <p>
                Authenticated: {auth.authenticated === true ? 'true' : 'false'}<br />
                Token: {auth.token ? auth.token : 'null'}
            </p>
            <p>This page should not be able to be accessed unless the user is authenticated.</p>
            <p><strong>Remember:</strong> <i>authenticated</i> is not the same as <i>authorized</i>. Role based authentication and authorization is beyond the scope of this application.</p>
        </div>
    );
}

export default Protected;

import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Home() {
    const auth = useContext(AuthContext);

    return (
        <div>
            <h1>Home</h1>
            <p>
                Authenticated: {auth.authenticated ? 'true' : 'false'}<br />
                Token: {auth.token ? auth.token : 'null'}
            </p>

            <p>This is the default page that can be viewed regardless of authentication. You must <a href="/login">login</a> to view the <a href="/protected">protected</a> page.</p>
        </div>
    );
}

export default Home;

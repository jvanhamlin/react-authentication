import React, { useContext } from 'react';
import { Redirect, Route } from "react-router-dom";
import AuthContext from '../context/AuthContext';

function PrivateRoute({ children, ...rest }) {
    const auth = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.authenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;

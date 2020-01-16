import React from 'react';

const AuthContext = React.createContext({
    authenticated: false,
    token: null,
    login: () => {}
});

export default AuthContext;
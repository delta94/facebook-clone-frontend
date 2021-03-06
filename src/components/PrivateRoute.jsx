import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ render: Component, ...props }) {
    const [authenticated, setAuthenticated] = useState(null);
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []);
    if (authenticated === null) {
        return <></>;
    }
    return (
        <Route
            {...props}
            render={(props) =>
                authenticated ? <Component {...props} /> : <Redirect to={'/users/log-in'} />
            }
        ></Route>
    );
}

export default PrivateRoute;

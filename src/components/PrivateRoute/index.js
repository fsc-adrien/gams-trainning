import React from "react";
import { Route, Redirect } from 'react-router-dom';

// PrivateRoute for login
const PrivateRoute = ({ component, ...rest }) => {
    const Component = component;
    const token = ""; // get token in cookies 
    return (
        <Route
            {...rest}
            render={() =>
                token ?
                    <Component /> :
                    <Redirect to="/" />
            }
        />
    )
}

export default PrivateRoute;
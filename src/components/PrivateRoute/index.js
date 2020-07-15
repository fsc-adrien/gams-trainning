import React from "react";
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

// PrivateRoute if not login will go to login
const PrivateRoute = ({ component, ...rest }) => {
    const Component = component;
    const token = Cookies.get("token"); // get token in cookies 
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
import React from 'react';
import './App.css';
import {
    Switch,
    Route,
} from "react-router-dom";
import 'antd/dist/antd.css';
import UserList from './screens/User/List';
import Asset from "./screens/Asset";
import LoginScreens from './screens/Login';
import LayoutWrapper from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <LoginScreens />
                </Route>
                {/* <PrivateRoute path="/assets" component={() => <LayoutWrapper component={Asset} />} /> */}
                <Route path="/assets" render={() => <LayoutWrapper component={Asset} />} />
                <Route path="/users" render={() => <LayoutWrapper component={UserList} />} />
            </Switch>
        </div>
    );
}


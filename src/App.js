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
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <LoginScreens />
                </Route>
                {/* <PrivateRoute path="/assets" component={() => <LayoutWrapper component={Asset} getProps={{ history: history }}/>} /> */}
                <Route path="/assets" render={() => <LayoutWrapper component={Asset} getProps={{ history: history }} />} />
                <Route path="/users" render={() => <LayoutWrapper component={UserList} getProps={{ history: history }} />} />
            </Switch>
        </div>
    );
}


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


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src='https://www.cmcglobal.com.vn/wp-content/uploads/2019/12/4095-4096-max-3.png' className="App-logo" alt="logo" />
//         <p>
//           Global Asset Management System
//         </p>
//       </header>
//     </div>
//   );
// }

export default function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <LoginScreens />
                </Route>
                <Route path="/assets" render={() => <LayoutWrapper component={Asset} />} />
                <Route path="/users" render={() => <LayoutWrapper component={UserList} />} />
            </Switch>
        </div>
    );
}


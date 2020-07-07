import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import UserList from './screens/User/List'
import 'antd/dist/antd.css';
import ErrorBoundary from './components/error-boundaries/ErrorBoundary';
import * as HttpStatus from './components/common/HttpStatus'


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
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/assets">Assets</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/assets">
                        <Assets />
                    </Route>
                    <Route path="/">
                        <ErrorBoundary>
                            <UserList />
                        </ErrorBoundary>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Assets() {
    return <h2>Assets</h2>;
}

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';
import reducer from './components/Reducer/reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// const history = createBrowserHistory();
//
// ReactDOM.render(
//   <React.StrictMode>
//       <Router history={history}>
//           <App />
//       </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
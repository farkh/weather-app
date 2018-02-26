import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { logUser } from './actions';
import { firebaseApp } from './firebase';
import { bake_cookie } from 'sfcookies';

import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import './main.css';

const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
	if (user) {
		const { email } = user;
		store.dispatch(logUser(email));
		bake_cookie('email', email);
		browserHistory.push(process.env.PUBLIC_URL + '/app');
	} else {
		browserHistory.replace(process.env.PUBLIC_URL + '/signin');
		bake_cookie('email', '');
	}
});

ReactDOM.render(
	<Provider store={store}>
		<Router path={process.env.PUBLIC_URL + '/'} history={browserHistory}>
			<Route path={process.env.PUBLIC_URL + '/app'} component={App} />
			<Route path={process.env.PUBLIC_URL + '/signin'} component={SignIn} />
			<Route path={process.env.PUBLIC_URL + '/signup'} component={SignUp} />
		</Router>
	</Provider>,
	document.getElementById('root')
);

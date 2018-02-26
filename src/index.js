import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
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
		hashHistory.push('/app');
	} else {
		hashHistory.replace('/signin');
		bake_cookie('email', '');
	}
});

ReactDOM.render(
	<Provider store={store}>
		<Router path={'/'} history={hashHistory}>
			<Route path='/app' component={App} />
			<Route path='/signin' component={SignIn} />
			<Route path='/signup' component={SignUp} />
		</Router>
	</Provider>,
	document.getElementById('root')
);

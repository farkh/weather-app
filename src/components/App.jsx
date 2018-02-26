import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { firebaseApp } from '../firebase';
import { connect } from 'react-redux';

import AddLocation from './AddLocation';
import LocationsList from './LocationsList';

class App extends Component {
	signOut() {
		firebaseApp.auth().signOut();
	}
	
	render() {
		return (
			<div className="app">
				<div className="app__header">
					<AddLocation />

					<div className="app__user-data">
						<span className='app__user-data-email'>{this.props.email}</span>
						<Button
							size='medium'
							color='red'
							onClick={ () => this.signOut() }
						>
							Logout
						</Button>
					</div>
				</div>
				<hr />

				<LocationsList />
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { email } = state.user;
	return { email };
}

export default connect(mapStateToProps, null)(App);

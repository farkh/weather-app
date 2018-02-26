import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { database } from '../firebase';

class AddLocation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			location: ''
		};
	}

	addLocation(event) {
		event.preventDefault();
		const { location } = this.state;
		const { email } = this.props;
		const ref = 'users/' + email.split('@')[0] + '/locations';
		document.getElementById('location').value = '';
		database.ref(ref).push({
			location
		});
	}

	render() {
		return (
			<Form onSubmit={ event => this.addLocation(event) }>
				<Input 
					type='text'
					id='location'
					placeholder='Enter location'
					className='add__input'
					onChange={ event => this.setState({ location: event.target.value })}
				/>
				<Button onClick={ event => this.addLocation(event) }>
					<Icon name='plus' />
					Add location
				</Button>
			</Form>
		);
	}
}

function mapStateToProps(state) {
	const { email } = state.user;
	return { email };
}

export default connect(mapStateToProps, null)(AddLocation);

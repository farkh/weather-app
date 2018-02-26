import React, { Component } from 'react';
import LocationItem from './LocationItem';
import { connect } from 'react-redux';
import { database } from '../firebase';
import { setLocations } from '../actions';
import { read_cookie } from 'sfcookies';

class LocationsList extends Component {
	componentDidMount() {
		const email = read_cookie('email');
		const ref = 'users/' + email.split('@')[0] + '/locations/';

		database.ref(ref).on('value', snap => {
			let locations = [];
			snap.forEach(location => {
				const locationName = location.val().location;
				const serverKey = location.key;
				locations.push({ locationName, serverKey });
			});

			this.props.setLocations(locations);
		});
	}
	
	render() {
		return (
			<div className='locations'>
				{this.props.locations.map((location, index) => {
					return <LocationItem location={location} key={index} />
				})}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { locations } = state;
	return { locations };
}

export default connect(mapStateToProps, { setLocations })(LocationsList);

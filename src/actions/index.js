import { SIGNED_IN, SET_LOCATIONS } from '../constants';

export function logUser(email) {
	const action = {
		type: SIGNED_IN,
		email
	};

	return action;
}

export function setLocations(locations) {
	const action = {
		type: SET_LOCATIONS,
		locations
	};

	return action;
}

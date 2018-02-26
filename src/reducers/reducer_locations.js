import  { SET_LOCATIONS } from '../constants';

export default (state = [], action) => {
	switch(action.type) {
		case SET_LOCATIONS:
			const { locations } = action;
			return locations;
		default:
			return state;
	}
}

import { combineReducers } from 'redux';
import user from './reducer_user';
import locations from './reducer_locations';

export default combineReducers({
	user,
	locations
});

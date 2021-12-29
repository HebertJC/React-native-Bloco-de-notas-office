//combine caso  a gente queira criar outros reducer
import {combineReducers} from 'redux';
import NotesReducer from './NotesReducer';

export default combineReducers({
    notes: NotesReducer
});
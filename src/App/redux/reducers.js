

import { combineReducers } from "redux";
import { actionTypes } from "./actions";

function tokenReducer(state = {}, action) {
	const { SET_TOKEN } = actionTypes;
	const { type, token } = action;
	switch (type) {
	case SET_TOKEN:
		return token;
	default:
		return state;
	}
}

function playlistsReducer(state = { items: [], selected: "" }, action) {
	const { UPDATE_PLAYLISTS, SELECT_PLAYLIST } = actionTypes;
	const { type, playlists, id } = action;
	switch (type) {
	case UPDATE_PLAYLISTS:
		return { ...state, ...playlists };
	case SELECT_PLAYLIST:
		return { ...state, selected: id };
	default:
		return state;
	}
}

function trackSearchReducer(state = {}, action) {
	const { UPDATE_TRACKSEARCH } = actionTypes;
	const { type, trackSearch } = action;
	switch (type) {
	case UPDATE_TRACKSEARCH:
		return trackSearch;
	default:
		return state;
	}
}

function topTracksReducer(state = {}, action) {
	const { UPDATE_TOPTRACKS } = actionTypes;
	const { type, topTracks } = action;
	switch (type) {
	case UPDATE_TOPTRACKS:
		return topTracks;
	default:
		return state;
	}
}

function currPlaylistTracksReducer(state = {}, action) {
	const { UPDATE_CURRPLAYLISTTRACKS } = actionTypes;
	const { type, currPlaylistTracks } = action;
	switch (type) {
	case UPDATE_CURRPLAYLISTTRACKS:
		return currPlaylistTracks;
	default:
		return state;
	}
}

function snackbarReducer(state = {}, action) {
	const { SET_SNACKBAR, SHOW_SNACKBAR } = actionTypes;
	const { type, options } = action;
	switch (type) {
	case SET_SNACKBAR:
		return options;
	case SHOW_SNACKBAR:
		return { ...options, open: true };
	default:
		return state;
	}
}

const rootReducer = combineReducers({
	token: tokenReducer,
	playlists: playlistsReducer,
	snackbar: snackbarReducer,
	trackSearch: trackSearchReducer,
	topTracks: topTracksReducer,
	currPlaylistTracks: currPlaylistTracksReducer
});

export { rootReducer };



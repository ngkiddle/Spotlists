

const types = {
	SET_TOKEN: "",
	UPDATE_PLAYLISTS: "",
	SHOW_PLAYLISTS: "",
	UPDATE_TRACKSEARCH: "",
	UPDATE_TOPTRACKS: "",
	SELECT_PLAYLIST: "",
	UPDATE_CURRPLAYLISTTRACKS: "",
	SET_SNACKBAR: "",
	SHOW_SNACKBAR: ""
};  Object.keys(types).forEach(k => types[k] = k);

function setToken(token) {
	return { type: types.SET_TOKEN, token };
}

//
// ─── PLAYLISTS ──────────────────────────────────────────────────────────────────
//
function updatePlaylists(playlists) {
	return { type: types.UPDATE_PLAYLISTS, playlists };
}

function showPlaylistSelection() {
	return { type: types.SHOW_PLAYLISTS };
}

function selectPlaylist(id) {
	return { type: types.SELECT_PLAYLIST, id };
}


//
// ─── SNACKBAR ───────────────────────────────────────────────────────────────────
//
const SnackbarOptions = {
	open: true,
	message: "Snackbar",
	severity: "success",
	onClose: () => console.log("Snackbar closed"),
};

function showSnackbar(options = SnackbarOptions) {
	return { type: types.SHOW_SNACKBAR, options };
}

function setSnackbar(options = SnackbarOptions) {
	return { type: types.SET_SNACKBAR, options };
}

// _____________________ TRACKS ____________________________

function updateTrackSearch(trackSearch) {
	return { type: types.UPDATE_TRACKSEARCH, trackSearch };
}

function updateTopTracks(topTracks) {
	return { type: types.UPDATE_TOPTRACKS, topTracks };
}

function updateCurrentPlaylistTracks(currPlaylistTracks){
	return { type: types.UPDATE_CURRPLAYLISTTRACKS, currPlaylistTracks };
}

export {
	types as actionTypes,
	setToken,
	updatePlaylists, 
	showSnackbar, 
	setSnackbar,
	updateTrackSearch, 
	updateTopTracks, 
	selectPlaylist, 
	updateCurrentPlaylistTracks
};

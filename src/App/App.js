import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";

import { Home, Playlists } from "Routes";
import { Navbar, PlaylistTrackList, TopTracks, TrackSearch } from "Components";

import { setSnackbar, setToken, showSnackbar, updatePlaylists } from "./redux/actions";
import { spotifyGetAccessToken, spotifyHttpGET } from "./spotify";

import { Snackbar, colors } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const base = "https://api.spotify.com/";

async function getPlaylists(token) {
	if (!token) {
		throw "Token not found!";
	}

	const url = new URL("v1/me/playlists", base);
	const response = await fetch(url, { headers: { "Authorization": `Bearer ${token}` } });
	const results = await response.json();
	return results;
}

function paramsToObject(entries) {
	let result = {};
	for (let entry of entries) { // each 'entry' is a [key, value] tupple
	  const [key, value] = entry;
	  result[key] = value;
	}
	return result;
}

function SnackbarController() {
	const dispatch = useDispatch();
	const snackbar = useSelector(state => state.snackbar);

	const handleSnackbarClose = () => {
		if (snackbar.onClose) {
			snackbar.onClose();
		}
		
		dispatch(setSnackbar({ ...snackbar, open: false }));
	};

	return (
		<Snackbar autoHideDuration={snackbar.autoHideDuration ?? 2000}
			open={snackbar.open} 
			onClose={handleSnackbarClose}>
			<Alert severity={snackbar.severity}>
				{snackbar.message}
			</Alert>
		</Snackbar>
	);
}
export function App() {
	const history = useHistory();
	const store = useStore();
	const dispatch = useDispatch();
	const [tokenOk, setTokenOk] = useState(false);

	useEffect(() => {
		// Return from token request
		if (window.location.hash) {
			spotifyHttpGET("me", (params) => {
				const token = paramsToObject(params);
				sessionStorage.clear();
				sessionStorage.setItem("token", JSON.stringify({ 
					...token,
					createdOn: Math.trunc(Date.now()/1000) 
				}));

				setTokenOk(true);
				history.push("/");
			}); return;
		}

		// App startup
		if (!tokenOk) {
			const token = JSON.parse(sessionStorage.getItem("token"));
			if (token && (Date.now()/1000 - token.createdOn) < token.expires_in) {
				setTokenOk(true);
			} else {
				spotifyGetAccessToken();
			}
		}
	}, []);

	// Token is OK, store the token from SessionStorage in Redux
	useEffect(() => {
		if (tokenOk) {
			const token = JSON.parse(sessionStorage.token);
			dispatch(setToken(token));
			fetchAndStorePlaylists();
		}
	}, [tokenOk]);

	const fetchAndStorePlaylists = async () => {
		try {
			const token = store.getState().token;
			const playlists = await getPlaylists(token.access_token);
			dispatch(updatePlaylists(playlists));
			dispatch(showSnackbar({ message: "Playlist updated!" }));
		} catch (error) {
			dispatch(showSnackbar({ message: error }));
		}
	};

    
	return (
		<div className="app">
			<Navbar />
			<Route exact path="/" component={Home} />
			<Route path="/playlists" component={Playlists} />
			<Route path="/toptracks/" component={TopTracks} />
			<Route path="/addtoplaylist/:playlistId" component={TrackSearch}/>
			<Route path="/viewplaylist/:playlistId" component={PlaylistTrackList}/>

			<SnackbarController />

			{/* <div className="test-buttons">
				<button onClick={fetchAndStorePlaylists}>
					Get Playlistsz
				</button>
				<button onClick={() => spotifyGetAccessToken()}>
					Authenticate
				</button>
			</div> */}
		</div>
	);
}

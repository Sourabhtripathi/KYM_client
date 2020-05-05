import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Landing from './Landing';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

const Home = (props) => {
	useEffect(() => {
		props.history.push('/discover');
	}, []);
	return <Landing />;
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps)(Home);
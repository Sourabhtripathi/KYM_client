import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { search } from '../helpers';
import default_avatar from '../assets/images/default_avatar.jpg';
import { onPlaylistClick, onUserClick } from '../helpers';

const SearchResults = ({ query, openPlaylists, registeredUsers }) => {
	const [ playlistContent, setPlaylistContent ] = useState([]);
	const [ userContent, setUserContent ] = useState([]);
	useEffect(
		() => {
			// Playlists
			let keys = [ 'playlistName' ];
			let options = {
				caseSensitive: false,
				sort: true
			};
			let result = search(openPlaylists, keys, query, options);
			setPlaylistContent(result);
			keys = [ 'name' ];
			result = search(registeredUsers, keys, query, options);
			setUserContent(result);
		},
		[ query ]
	);

	const renderPlaylistResults = () => {
		if (playlistContent.length === 0) {
			return (
				<div>
					<h2>No Playlist found</h2>
				</div>
			);
		} else {
			return (
				<div>
					<h1>Playlists</h1>
					{playlistContent.map((playlist, index) => {
						return (
							<li key={index}>
								<div>
									<header>
										<span className="playlist" onClick={() => onPlaylistClick(playlist.playlistId)}>
											{playlist.playlistName}
										</span>
									</header>
									<img src={playlist.images[0].url} style={{ height: '100px', width: '100px' }} />
								</div>
							</li>
						);
					})}
				</div>
			);
		}
	};

	const renderUserResults = () => {
		if (userContent.length === 0) {
			return (
				<div>
					<h2>No User found</h2>
				</div>
			);
		} else {
			return (
				<div>
					<h1>Users</h1>
					{userContent.map((user, index) => {
						console.log(user.images);
						return (
							<li key={index}>
								<div>
									<header>
										<span className="playlist" onClick={() => onUserClick(user.userId)}>
											{user.name}
										</span>
									</header>
									<img
										src={user.images.length > 0 ? user.images[0].url : default_avatar}
										style={{ height: '100px', width: '100px' }}
									/>
								</div>
							</li>
						);
					})}
				</div>
			);
		}
	};

	if (query === '') {
		return (
			<div>
				<h2>Search for a playlist or a user</h2>
			</div>
		);
	} else {
		return (
			<div>
				{renderPlaylistResults()}
				{renderUserResults()}
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		openPlaylists: state.user.openPlaylists,
		registeredUsers: state.db.registeredUsers
	};
};

export default connect(mapStateToProps)(SearchResults);

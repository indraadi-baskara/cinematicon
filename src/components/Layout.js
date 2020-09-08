import React, { useState, useEffect, useReducer } from "react";
import Navigation from "./Navigation";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const initialState = {
	loading: true,
	movies: [],
	errorMessage: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SEARCH_MOVIES_REQUEST":
			return {
				...state,
				loading: true,
				errorMessage: null,
			};
		case "SEARCH_MOVIES_SUCCESS":
			return {
				...state,
				loading: false,
				movies: action.payload,
			};
		case "SEARCH_MOVIES_FAILURE":
			return {
				...state,
				loading: false,
				errorMessage: action.error,
			};
		default:
			return state;
	}
};

const AppLayout = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const search = (searchParameter) => {
		dispatch({
			type: "SEARCH_MOVIES_REQUEST",
		});
		fetch(`https://www.omdbapi.com/?s=${searchParameter}&apikey=4a3b711b`)
			.then((response) => response.json())
			.then((jsonResponse) => {
				if (jsonResponse.Response === "True") {
					dispatch({
						type: "SEARCH_MOVIES_SUCCESS",
						payload: jsonResponse.Search,
					});
				} else {
					dispatch({
						type: "SEARCH_MOVIES_FAILURE",
						error: jsonResponse.error,
					});
				}
			});
	};

	useEffect(() => {
		fetch(MOVIE_API_URL)
			.then((response) => response.json())
			.then((jsonResponse) => {
				dispatch({
					type: "SEARCH_MOVIES_SUCCESS",
					payload: jsonResponse.Search,
				});
			});
	}, []);

	const { movies, loading, errorMessage } = state;

	return (
		<div className="min-h-screen bg-gray-200 p-2">
			<Navigation />
			<SearchBar search={search} loading={loading} />
			<div className="grid grid-cols-4 gap-3 p-2 justify-items-center">
				{loading && !errorMessage ? (
					<p>Loading....</p>
				) : errorMessage ? (
					<div>{errorMessage}</div>
				) : (
					movies.map((movie, index) => {
						return <MovieCard key={index} movie={movie} />;
					})
				)}
			</div>
		</div>
	);
};

export default AppLayout;

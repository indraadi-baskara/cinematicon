import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navigation from "./Navigation";
import MovieCard from "./MovieCard";
import MovieDetail from "./MovieDetail";
import SearchBar from "./SearchBar";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const initialState = {
	loading: true,
	movies: [],
	movie: null,
	errorMessage: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SEARCH_MOVIE_REQUEST":
			return {
				...state,
				loading: true,
				errorMessage: null,
			};
		case "RESET_MOVIE":
			return {
				...state,
				movie: null,
			};
		case "SEARCH_MOVIES_REQUEST":
			return {
				...state,
				loading: true,
				errorMessage: null,
			};
		case "SEARCH_MOVIE_SUCCESS":
			return {
				...state,
				loading: false,
				errorMessage: null,
				movie: action.payload,
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
	const { movies, movie, loading, errorMessage } = state;

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
						error: jsonResponse.Error,
					});
				}
			});
	};

	const searchById = (searchParameter) => {
		dispatch({
			type: "SEARCH_MOVIE_REQUEST",
		});
		dispatch({
			type: "RESET_MOVIE",
		});
		fetch(`https://www.omdbapi.com/?i=${searchParameter}&apikey=4a3b711b`)
			.then((response) => response.json())
			.then((jsonResponse) => {
				if (jsonResponse.Response === "True") {
					dispatch({
						type: "SEARCH_MOVIE_SUCCESS",
						payload: jsonResponse,
					});
					console.log(movie);
				} else {
					dispatch({
						type: "SEARCH_MOVIES_FAILURE",
						error: jsonResponse.Error,
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

	return (
		<BrowserRouter>
			<div className="min-h-screen bg-gray-200">
				<Navigation />
				<div className="">
					<Switch>
						<Route path="/" exact>
							<SearchBar search={search} loading={loading} />

							{loading && !errorMessage ? (
								<p>Loading....</p>
							) : errorMessage ? (
								<div>{errorMessage}</div>
							) : (
								<div className="grid grid-cols-6 gap-3 p-2 justify-items-center">
									{movies.map((movie, index) => {
										return <MovieCard key={index} movie={movie} />;
									})}
								</div>
							)}
						</Route>
						<Route path="/movie/:imdbID">
							<MovieDetail />
						</Route>
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default AppLayout;

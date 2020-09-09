import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = (props) => {
	let { imdbID } = useParams();

	useEffect(() => {
		props.searchById(imdbID);
	}, [imdbID]);

	return (
		<div>
			<h1>Movie detail</h1>
			<p>some descriptions of {imdbID}</p>
		</div>
	);
};

export default MovieDetail;

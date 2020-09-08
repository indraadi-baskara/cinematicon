import React, { useState } from "react";

const SearchBar = (props) => {
	const [searchParameter, setSearchParameter] = useState("");
	const handleKeypress = (event) => {
		if (event.key === "Enter") {
			props.search(searchParameter);
		}
	};

	return (
		<div className="m-4">
			<input
				disabled={props.loading}
				value={searchParameter}
				onChange={(e) => setSearchParameter(e.target.value)}
				onKeyPress={handleKeypress}
				className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
				type="text"
				placeholder="Search"
			></input>
		</div>
	);
};

export default SearchBar;

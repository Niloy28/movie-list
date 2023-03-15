import React, { useState } from "react";
import MoviesList from "./components/MoviesList";

import "./App.css";

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMovieList = async () => {
		setError(null);
		setIsLoading(true);

		try {
			const response = await fetch("https://swapi.dev/api/films/");

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const data = await response.json();
			const transformedMovies = data.results.map((movie) => {
				return {
					title: movie.title,
					id: movie.episode_id,
					openingText: movie.opening_crawl,
					releaseDate: movie.release_date,
				};
			});

			setMovies(transformedMovies);
		} catch (error) {
			setError(error.message);
		}

		setIsLoading(false);
	};

	let content = <p>No movies found.</p>;
	if (!isLoading && movies.length > 0) {
		content = <MoviesList movies={movies} />;
	} else if (!isLoading && error) {
		content = <p>{error}</p>;
	} else if (isLoading) {
		content = <p>Loading...</p>;
	}

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMovieList}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	);
}

export default App;

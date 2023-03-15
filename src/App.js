import React, { useState } from "react";
import MoviesList from "./components/MoviesList";

import "./App.css";

function App() {
	const [movies, setMovies] = useState([]);

	const fetchMovieList = () => {
		fetch("https://swapi.dev/api/films/")
			.then((response) => response.json())
			.then((data) => {
				const transformedMovies = data.results.map((movie) => {
					return {
						title: movie.title,
						episodeId: movie.episode_id,
						openingText: movie.opening_crawl,
						releaseDate: movie.release_date,
					};
				});

				setMovies(transformedMovies);
			});
	};

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMovieList}>Fetch Movies</button>
			</section>
			{movies.length !== 0 && (
				<>
					<section>
						<MoviesList movies={movies} />
					</section>
				</>
			)}
		</React.Fragment>
	);
}

export default App;

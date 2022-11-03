import React, { useState } from "react"
import MovieForm from "./Components/MovieForm";
import MovieList from "./Components/MovieList";
import SearchReviews from "./Components/SearchReviews";
import SearchMovies from "./Components/SearchMovies";
import DisplayMovie from "./Components/DisplayMovie";
import ApiManager from "./Api/ApiManager";

function Main() {
	const [movieList, setMovieList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const [ selectedMovieData, setSelectedMovieData ] = useState({})

  	const onMovieFormSubmit = (movie) => {
    	setMovieList((movieList) => [...movieList, movie]);
  	};

	const handleClearList = () => {
		setMovieList([]);
	};

	const handleDeleteMovie = (movie) => {
		setMovieList(movieList.filter((item) => item.title !== movie.title));
	};

	const handleSearchTerm = (search) => {
		setSearchTerm(search);
	};

	let dynamicMovieList = () => {
		if (!searchTerm) {
			return movieList;
		} 
		else {
			let list = movieList.filter(
				(movie) => movie.title.toLowerCase().indexOf(searchTerm) > -1
		);
			return list;
		}
	};

	const onMovieSelect = async (movie) => {
		let response = await ApiManager.router.movie.getMovieById({id: movie.id})
        if (response.isSuccess) {
            let data = response.data
            console.log('got movie details')
            setSelectedMovieData(data)
        }
	}

	return (
		<React.Fragment>
			{/*<h1>Movie Ratings</h1>
			<div className="contentHolder">
				<MovieForm movieFormSubmit={onMovieFormSubmit} />
				<div className="listContainer">
					<SearchReviews searchTerm={handleSearchTerm} />
					<MovieList
						handleClearList={handleClearList}
						handleDeleteMovie={handleDeleteMovie}
						movieList={dynamicMovieList()}
					/>
				</div>
			</div>*/}
			<SearchMovies onMovieSelect={onMovieSelect} />
			<DisplayMovie movieData={selectedMovieData} />
		</React.Fragment>
	);
}

export default Main;
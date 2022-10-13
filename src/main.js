import React, { useState } from "react"
import MovieForm from "./Components/MovieForm";
import MovieList from "./Components/MovieList";
import SearchBar from "./Components/SearchBar";

function Main() {
  const [movieList, setMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    } else {
      let list = movieList.filter(
        (movie) => movie.title.toLowerCase().indexOf(searchTerm) > -1
      );
      return list;
    }
  };

  return (
    <div className="App">
      <h1>Movie Ratings</h1>
      <div className="contentHolder">
        <MovieForm movieFormSubmit={onMovieFormSubmit} />
        <div className="listContainer">
          <SearchBar searchTerm={handleSearchTerm} />
          <MovieList
            handleClearList={handleClearList}
            handleDeleteMovie={handleDeleteMovie}
            movieList={dynamicMovieList()}
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MovieList(props) {
  const handleClearList = () => {
    props.handleClearList();
  };

  const handleDeleteMovie = (movie) => {
    props.handleDeleteMovie(movie);
  };

  return (
    <div className="listContent">
      {props.movieList.length !== 0 && (
        <div className="listHeader">
          <div className="listHeader">Title</div>
          <div className="listHeader">Rating</div>
        </div>
      )}
      <div className="movieItemContainer">
        {props.movieList.length !== 0 &&
          props.movieList.map((movie, index) => {
            return (
              <div className="listItem" key={index}>
                <div className="movieTitle">{movie.title}</div>
                <div className="movieRating">{movie.rating}</div>
                <div
                  className="deleteIcon"
                  onClick={() => handleDeleteMovie(movie)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
            );
          })}
      </div>
      {props.movieList.length !== 0 ? (
        <div>
          <button onClick={handleClearList}>Clear List</button>
        </div>
      ) : (
        <div>List Empty</div>
      )}
    </div>
  );
}

export default MovieList;

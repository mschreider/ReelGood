import React, { useEffect, useState } from "react";
import { Button, Text, Box } from '@mantine/core';
import {SubmitButtonStyle} from '../Utilities/ComponentStyles.js'

function MovieForm(props) {
  const [movie, setMovie] = useState({
    title: "",
    rating: 5
  });

  const ratingChange = (e) => {
    setMovie({
      ...movie,
      rating: e.target.value
    });
  };

  const titleChange = (e) => {
    setMovie({
      ...movie,
      title: e.target.value
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    props.movieFormSubmit(movie);
    setMovie({
      title: "",
      rating: 5
    });
  };

  return (
    <form className="movieForm">
      <div className="inputTitle">
        <label>Title</label>
        <input
          placeholder="enter movie title"
          type="text"
          name="title"
          value={movie.title}
          onChange={titleChange}
        />
      </div>
      <div className="inputRating">
        <div className="inputRatingHeader">
          <label>Rating</label>
          <label className="ratingValue">{movie.rating}</label>
        </div>
        <input
          type="range"
          name="rating"
          step="0.5"
          min="0"
          max="10"
          value={movie.rating}
          onChange={ratingChange}
        />
      </div>
      <div className="submit">
        <Button sx={SubmitButtonStyle} onClick={onFormSubmit}>
          Submit
        </Button>
      </div>
    </form>
  );
}

export default MovieForm;

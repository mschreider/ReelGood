import React from "react"
import ApiManager from "../Api/ApiManager";

function SearchReviews(props) {
    const editSearchTerm = (e) => {
      props.searchTerm(e.target.value);
    };
    return (
      <input placeholder="search movie" type="text" onChange={editSearchTerm} />
    );
}
  
export default SearchReviews;
  
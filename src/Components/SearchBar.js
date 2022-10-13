import React from "react"

function SearchBar(props) {
    const editSearchTerm = (e) => {
      props.searchTerm(e.target.value);
    };
    return (
      <input placeholder="search movie" type="text" onChange={editSearchTerm} />
    );
}
  
export default SearchBar;
  
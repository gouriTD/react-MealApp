import React, { useRef } from "react";


// We are adding the search tab inorder to explore the debouncing concept.

function SearchTab({ onChange }) {
  const timeout = useRef();
  const handleChange = (e) => {
    if (timeout.current !== null) {
      clearTimeout(timeout.current);
    }

    // Here we are implementing the debouncing technique wherein we are searching for a given meal after a timeout value.
    timeout.current = setTimeout(() => {
      timeout.current = null;
      onChange(e);
    }, 300);
  };
  return (
    <form action="#">
      <input
        type="text"
        placeholder="Search an item...."
        id="search"
        onChange={handleChange}
        required
      />
    </form>
  );
}

export default SearchTab;

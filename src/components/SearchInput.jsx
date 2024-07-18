import React, { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder="Поиск по таблице"
      style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
    />
  );
};

export default SearchInput;

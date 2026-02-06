import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input.trim());
    setInput("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="都市名を入力（日本語/英語）"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">追加</button>
    </form>
  );
}

export default SearchBar;

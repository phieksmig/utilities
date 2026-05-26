import { useState } from "react";

export default function TokenFinder() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <h1>Token Finder</h1>
      <p>Search and find design tokens.</p>

      <div style={{ marginTop: "2rem" }}>
        <label htmlFor="search-input">
          Search tokens:
          <input
            id="search-input"
            type="text"
            placeholder="Enter token name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginLeft: "0.5rem", padding: "0.5rem", width: "300px" }}
          />
        </label>
      </div>

      {searchQuery && (
        <div style={{ marginTop: "1rem" }}>
          <p>
            Search results for: <strong>{searchQuery}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

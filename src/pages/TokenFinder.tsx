import { useState } from "react";
import { TextField, Heading } from "@midas-ds/components";

export default function TokenFinder() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Heading level={1}>Hitta tokens</Heading>
      <p>Här kommer du kunna sökaefter design tokens...</p>

      <div>
        <TextField
          label="Ange tokennamn"
          id="search-input"
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      {searchQuery && (
        <div>
          <p>
            Du har sökt efter <strong>{searchQuery}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { TextField, Heading } from "@midas-ds/components";

export default function TokenFinder() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Heading level={1}>Hitta tokens</Heading>
      <p>
        Här kommer du kunna söka efter en hexkod och se vilka design tokens som
        har den färgen
      </p>

      <div>
        <TextField
          label="Ange hexkod (t.ex. #ff0000)"
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

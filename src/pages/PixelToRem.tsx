import { useState } from "react";
import { TextField, Heading } from "@midas-ds/components";

export default function PixelToRem() {
  const [pixelValue, setPixelValue] = useState("16");

  const remValue = (parseFloat(pixelValue) / 16).toFixed(2);

  return (
    <div>
      <Heading level={1}>Pixel to REM Converter</Heading>
      <p>Konvertera pixelvärden till REM (baserat på fontstorlek 16px).</p>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          maxWidth: "600px",
        }}
      >
        <TextField
          label="Pixels"
          id="pixel-input"
          type="number"
          value={pixelValue}
          onChange={setPixelValue}
        />
        <TextField
          label="rem"
          id="rem-input"
          type="number"
          value={remValue}
          isReadOnly
        />
      </div>
    </div>
  );
}

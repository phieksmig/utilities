import { useState } from "react";
import { TextField, Heading, Button } from "@midas-ds/components";
import { ArrowLeftRight } from "lucide-react";

export default function PixelToRem() {
  const [pixelValue, setPixelValue] = useState("16");
  const [remToPixel, setRemToPixel] = useState(false);
  const [remValue, setRemValue] = useState("1");

  const formatValue = (value: number, decimals: number) => {
    if (Number.isNaN(value)) return "";
    return parseFloat(value.toFixed(decimals)).toString();
  };

  const remFromPixelValue = formatValue(parseFloat(pixelValue) / 16, 4);
  const pixelFromRemValue = formatValue(parseFloat(remValue) * 16, 2);

  if (remToPixel) {
    return (
      <div>
        <Heading level={1}>REM till Pixlar</Heading>
        <p>Konvertera REM till Pixel (baserat på fontstorlek 16px).</p>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            alignItems: "flex-end",
          }}
        >
          <TextField
            label="Rem"
            id="rem-input"
            type="number"
            value={remValue}
            onChange={setRemValue}
          />
          <Button
            variant="icon"
            icon={ArrowLeftRight}
            onPress={() => {
              setPixelValue(pixelFromRemValue);
              setRemToPixel(false);
            }}
          />
          <TextField
            label="Pixlar"
            id="pixel-input"
            type="number"
            value={pixelFromRemValue}
            isReadOnly
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading level={1}>Pixlar till Rem</Heading>
      <p>Konvertera pixelvärden till REM (baserat på fontstorlek 16px).</p>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          alignItems: "flex-end",
        }}
      >
        <TextField
          label="Pixlar"
          id="pixel-input"
          type="number"
          value={pixelValue}
          onChange={setPixelValue}
        />
        <Button
          variant="icon"
          icon={ArrowLeftRight}
          onPress={() => {
            setRemValue(remFromPixelValue);
            setRemToPixel(true);
          }}
        />
        <TextField
          label="Rem"
          id="rem-input"
          type="number"
          value={remFromPixelValue}
          isReadOnly
        />
      </div>
    </div>
  );
}

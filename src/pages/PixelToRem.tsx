import { useState } from "react";
import { toastQueue, TextField, Heading, Button } from "@midas-ds/components";
import { ArrowLeftRight, Copy } from "lucide-react";
import styles from "./PixelToRem.module.css";

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
      <>
        <div className={styles.mainContainer}>
          <Heading level={1}>REM till Pixlar</Heading>
          <p>Konvertera rem till pixelvärden (baserat på fontstorlek 16px).</p>

          <div className={styles.converter}>
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
            <Button
              variant="icon"
              icon={Copy}
              onPress={() => {
                navigator.clipboard.writeText(pixelFromRemValue);
                toastQueue.add(
                  { type: "success", message: "Pixelvärdet har kopierats" },
                  { timeout: 5000 },
                );
              }}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <Heading level={1}>Pixlar till Rem</Heading>
      <p>Konvertera pixelvärden till rem (baserat på fontstorlek 16px).</p>

      <div className={styles.converter}>
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
        <Button
          variant="icon"
          icon={Copy}
          onPress={() => {
            navigator.clipboard.writeText(remFromPixelValue);
            toastQueue.add(
              { type: "success", message: "rem-värdet har kopierats" },
              { timeout: 5000 },
            );
          }}
        />
      </div>
    </div>
  );
}

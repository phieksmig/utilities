import { DateField, Text, ComboBox, ListBoxItem } from "@midas-ds/components";
import { useState } from "react";
import styles from "./Demo.module.css";
import { useTwoDigitYear } from "../hooks/useTwoDigitYear";

export default function Demo() {
  const dateProps = useTwoDigitYear(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  interface Product {
    id: string;
    name: string;
    code: string;
  }

  const products: Product[] = [
    { id: "1", name: "Banan", code: "1234" },
    { id: "2", name: "Äpple", code: "5678" },
  ];

  const customFilter = (textValue: string, filterText: string) => {
    return textValue.toLowerCase().includes(filterText.toLowerCase());
  };

  const handleInputChange = (value: string) => {
    const selectedProduct = products.find(
      (item) => value === `${item.name} ${item.code}`,
    );

    if (selectedProduct) {
      setSelectedKey(selectedProduct.id);
      setInputValue(selectedProduct.name);
      return;
    }

    setSelectedKey(null);
    setInputValue(value);
  };

  return (
    <div className={styles.mainContainer}>
      <Text>Demo av DateField med tvåsiffrigt år</Text>
      <DateField
        label="Datum"
        description="Skriv in ett datum med 2 siffror för årtalet"
        value={dateProps.value}
        onChange={dateProps.onChange}
      />

      <ComboBox
        label="Välj frukt"
        description="Sök efter fruktens namn eller specialkod (testa 1234 eller 5678)"
        items={products}
        defaultFilter={customFilter}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        value={selectedKey}
        onChange={(key) => {
          const nextKey = key == null ? null : String(key);
          const product = products.find((item) => item.id === nextKey);

          setSelectedKey(nextKey);
          setInputValue(product?.name ?? "");
        }}
      >
        {(item) => (
          <ListBoxItem textValue={`${item.name} ${item.code}`}>
            {item.name}
          </ListBoxItem>
        )}
      </ComboBox>
    </div>
  );
}

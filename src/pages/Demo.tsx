import { DateField, Text, ComboBox, ListBoxItem } from "@midas-ds/components";
import { useState } from "react";
import styles from "./Demo.module.css";
import { useTwoDigitYear } from "../hooks/useTwoDigitYear";

interface FruitOption {
  id: string;
  name: string;
  kind: "fruit" | "create";
}

export default function Demo() {
  const dateProps = useTwoDigitYear(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [fruitOptions, setFruitOptions] = useState<FruitOption[]>([
    { id: "fruit-1", name: "Banan", kind: "fruit" },
    { id: "fruit-2", name: "Äpple", kind: "fruit" },
  ]);
  const [fruitInputValue, setFruitInputValue] = useState("");
  const [selectedFruitKey, setSelectedFruitKey] = useState<string | null>(null);

  interface Product {
    id: string;
    name: string;
    code: string;
  }

  const products: Product[] = [
    { id: "1", name: "Banan", code: "1234" },
    { id: "2", name: "Äpple", code: "5678" },
  ];

  const fruitQuery = fruitInputValue.trim();
  const matchingFruitExists =
    fruitQuery.length > 0 &&
    fruitOptions.some(
      (fruit) =>
        fruit.kind === "fruit" &&
        fruit.name.toLowerCase().includes(fruitQuery.toLowerCase()),
    );
  const creatableFruitOptions: FruitOption[] = [
    ...fruitOptions,
    ...(!fruitQuery || matchingFruitExists
      ? []
      : [
          {
            id: `create:${fruitQuery.toLowerCase()}`,
            name: fruitQuery,
            kind: "create" as const,
          },
        ]),
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
            <span className={styles.productOption}>
              <span>{item.name}</span>
              <span className={styles.productCode}>{item.code}</span>
            </span>
          </ListBoxItem>
        )}
      </ComboBox>
      <ComboBox
        label="Välj frukt"
        description="Sök efter en frukt eller skriv en ny om ingen matchar"
        items={creatableFruitOptions}
        inputValue={fruitInputValue}
        selectedKey={selectedFruitKey}
        defaultFilter={customFilter}
        onInputChange={(value) => {
          setFruitInputValue(value);
          setSelectedFruitKey(null);
        }}
        onChange={(key) => {
          if (key == null) {
            setSelectedFruitKey(null);
            return;
          }

          const option = creatableFruitOptions.find(
            (fruit) => fruit.id === String(key),
          );
          if (!option) return;

          if (option.kind === "create") {
            const newFruit = {
              id: `custom:${option.name.toLowerCase()}`,
              name: option.name,
              kind: "fruit" as const,
            };
            setFruitOptions((currentOptions) => [...currentOptions, newFruit]);
            setSelectedFruitKey(newFruit.id);
            setFruitInputValue(newFruit.name);
            return;
          }

          setSelectedFruitKey(option.id);
          setFruitInputValue(option.name);
        }}
      >
        {(fruit) => (
          <ListBoxItem textValue={fruit.name}>
            {fruit.kind === "create" ? `Create "${fruit.name}"` : fruit.name}
          </ListBoxItem>
        )}
      </ComboBox>
    </div>
  );
}

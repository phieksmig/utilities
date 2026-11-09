import { useState } from "react";
import {
  Table,
  TableHeader,
  Column,
  TableBody,
  Row,
  Cell,
  Button,
} from "@midas-ds/components";
import { Edit } from "lucide-react";
import { useOutletContext } from "react-router";

const fruits = [
  {
    id: "banana",
    name: "Banan",
    type: "Ört, bär, frukt",
    shortName: "Ban",
    rules: [
      { name: "Regel 1", description: "Should be yellow when ripe." },
      { name: "Regel 2", description: "Use Ban." },
    ],
  },
  {
    id: "pear",
    name: "Päron",
    type: "Frukt",
    shortName: "Pär",
    rules: [
      { name: "Color", description: "Usually green." },
      { name: "Short name", description: "Use Pär." },
    ],
  },
];

export default function TableTest() {
  const { openDetails } = useOutletContext<{ openDetails: () => void }>();
  const [selectedFruitId, setSelectedFruitId] = useState<string | null>(null);
  const selectedFruit = fruits.find((fruit) => fruit.id === selectedFruitId);

  return (
    <>
      <Table aria-label="Fruit">
        <TableHeader>
          <Column>Namn</Column>
          <Column>Typ</Column>
          <Column>Kortnamn</Column>
          <Column>Redigera</Column>
        </TableHeader>
        <TableBody>
          {fruits.map((fruit) => (
            <Row
              key={fruit.id}
              id={fruit.id}
              onAction={() =>
                setSelectedFruitId((currentId) =>
                  currentId === fruit.id ? null : fruit.id,
                )
              }
            >
              <Cell>{fruit.name}</Cell>
              <Cell>{fruit.type}</Cell>
              <Cell>{fruit.shortName}</Cell>
              <Cell>
                <Button
                  variant="icon"
                  icon={Edit}
                  aria-label={`Redigera ${fruit.name}`}
                  onPress={openDetails}
                />
              </Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
      {selectedFruit && (
        <section aria-label={`${selectedFruit.name} rules`}>
          <h2>Regler for {selectedFruit.name}</h2>
          <Table aria-label={`Rules for ${selectedFruit.name}`}>
            <TableHeader>
              <Column>Namn</Column>
              <Column>Beskrivning</Column>
            </TableHeader>
            <TableBody>
              {selectedFruit.rules.map((rule) => (
                <Row key={rule.name} id={rule.name}>
                  <Cell>{rule.name}</Cell>
                  <Cell>{rule.description}</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
    </>
  );
}

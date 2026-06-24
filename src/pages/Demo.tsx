import { DateField, Text } from "@midas-ds/components";
import styles from "./Demo.module.css";
import { useTwoDigitYear } from "../hooks/useTwoDigitYear";

export default function Demo() {
  const dateProps = useTwoDigitYear(null);

  return (
    <div className={styles.mainContainer}>
      <Text>Demo av DateField med tvåsiffrigt år</Text>
      <DateField
        label="Datum"
        description="Skriv in ett datum med 2 siffror för årtalet"
        value={dateProps.value}
        onChange={dateProps.onChange}
      />
    </div>
  );
}

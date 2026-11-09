import { Heading } from "@midas-ds/components";
import styles from "./AdminTool.module.css";

export default function AdminTool() {
  return (
    <div className={styles.mainContainer}>
      <Heading enableMargins isExpressive level={1}>
        Läge och flöde
      </Heading>
    </div>
  );
}

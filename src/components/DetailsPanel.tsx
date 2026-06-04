import { Panel } from "@midas-ds/layout";
import { Text } from "@midas-ds/components";
import styles from "./DetailsPanel.module.css";

interface DetailsPanelProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DetailsPanel = ({ isOpen, onOpenChange }: DetailsPanelProps) => {
  return (
    <Panel
      id="detaljer"
      title="Detaljer"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className={styles.panelContainer}>
        <Text>En cool text yo!</Text>
      </div>
    </Panel>
  );
};

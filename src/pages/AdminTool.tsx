import {
  Button,
  ButtonGroup,
  Accordion,
  AccordionItem,
  Checkbox,
  CheckboxGroup,
  ComboBox,
  ListBoxItem,
  Modal,
  TextField,
} from "@midas-ds/components";
import { Settings } from "lucide-react";
import { useState } from "react";
import styles from "./AdminTool.module.css";

const flows = [
  { id: "flow-1", name: "Flow 1" },
  { id: "flow-2", name: "Flow 2" },
];
const tracks = [
  { id: "track-1", name: "Track 1" },
  { id: "track-2", name: "Track 2" },
];

export default function AdminTool() {
  const [isAddIntervalOpen, setIsAddIntervalOpen] = useState(false);
  const [isPickFlowTrackOpen, setIsPickFlowTrackOpen] = useState(false);
  const [intervalName, setIntervalName] = useState("");
  const [selectedFlows, setSelectedFlows] = useState(["flow-1"]);
  const [selectedTracks, setSelectedTracks] = useState(["track-1"]);
  const [flowDraft, setFlowDraft] = useState(selectedFlows);
  const [trackDraft, setTrackDraft] = useState(selectedTracks);
  const [intervalSelections, setIntervalSelections] = useState<
    Record<string, Record<string, string | null>>
  >({});
  const [intervals, setIntervals] = useState([
    "ABC - ingen frukt",
    "Gallring",
    "ABC - fem frukter",
  ]);

  const openFlowTrackPicker = () => {
    setFlowDraft(selectedFlows);
    setTrackDraft(selectedTracks);
    setIsPickFlowTrackOpen(true);
  };

  const handleSaveFlowTrack = () => {
    setSelectedFlows(flowDraft);
    setSelectedTracks(trackDraft);
    setIsPickFlowTrackOpen(false);
  };

  const handleAddInterval = () => {
    const name = intervalName.trim();
    if (!name) return;

    setIntervals((currentIntervals) =>
      currentIntervals.includes(name)
        ? currentIntervals
        : [...currentIntervals, name],
    );
    setIntervalName("");
    setIsAddIntervalOpen(false);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerRow}>
        <Button variant="secondary" onPress={() => setIsAddIntervalOpen(true)}>
          Lägg till intervall
        </Button>
        <Modal
          title="Lägg till intervall"
          isOpen={isAddIntervalOpen}
          onOpenChange={setIsAddIntervalOpen}
          footer={
            <Button
              onPress={handleAddInterval}
              isDisabled={!intervalName.trim()}
            >
              Spara
            </Button>
          }
        >
          <TextField
            label="Namn"
            value={intervalName}
            onChange={setIntervalName}
            isRequired
          />
        </Modal>

        <Button
          variant="icon"
          icon={Settings}
          aria-label="Verktyg"
          onPress={openFlowTrackPicker}
        />
        <Modal
          title="Pick flow and track"
          isOpen={isPickFlowTrackOpen}
          onOpenChange={setIsPickFlowTrackOpen}
          footer={<Button onPress={handleSaveFlowTrack}>Spara</Button>}
        >
          This should be two multi combo boxes
          <CheckboxGroup
            label="Välj flow"
            value={flowDraft}
            onChange={setFlowDraft}
          >
            {flows.map((flow) => (
              <Checkbox key={flow.id} value={flow.id}>
                {flow.name}
              </Checkbox>
            ))}
          </CheckboxGroup>
          <CheckboxGroup
            label="Välj track"
            value={trackDraft}
            onChange={setTrackDraft}
          >
            {tracks.map((track) => (
              <Checkbox key={track.id} value={track.id}>
                {track.name}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </Modal>
      </div>
      <Accordion isContained>
        {flows
          .filter((flow) => selectedFlows.includes(flow.id))
          .map((flow) => (
            <AccordionItem key={flow.id} id={flow.id} title={flow.name}>
              {tracks
                .filter((track) => selectedTracks.includes(track.id))
                .map((track) => (
                  <div className={styles.trackContainer} key={track.id}>
                    {track.name}
                    <ComboBox
                      size="medium"
                      placeholder="Välj eller sök intervall"
                      selectedKey={
                        intervalSelections[flow.id]?.[track.id] ?? null
                      }
                      onSelectionChange={(key) => {
                        if (typeof key === "string" || key === null) {
                          setIntervalSelections((currentSelections) => ({
                            ...currentSelections,
                            [flow.id]: {
                              ...currentSelections[flow.id],
                              [track.id]: key,
                            },
                          }));
                        }
                      }}
                    >
                      {intervals.map((interval) => (
                        <ListBoxItem key={interval} id={interval}>
                          {interval}
                        </ListBoxItem>
                      ))}
                    </ComboBox>
                  </div>
                ))}
            </AccordionItem>
          ))}
      </Accordion>
      <ButtonGroup>
        <Button>Spara</Button>
        <Button variant="secondary">Avbryt</Button>
      </ButtonGroup>
    </div>
  );
}

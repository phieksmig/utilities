import {
  Text,
  LinkButton,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
} from "@midas-ds/components";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [downloads, setDownloads] = useState<number | null>(null);
  const [layoutDownloads, setLayoutDownloads] = useState<number | null>(null);
  const [openIssues, setOpenIssues] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          "https://api.npmjs.org/downloads/point/last-week/@midas-ds/components",
        );
        const data = await response.json();
        setDownloads(
          typeof data?.downloads === "number" ? data.downloads : null,
        );
      } catch (error) {
        console.error("Error fetching download data:", error);
        setDownloads(null);
      }
    }

    load();
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          "https://api.npmjs.org/downloads/point/last-week/@midas-ds/layout",
        );
        const data = await response.json();
        setLayoutDownloads(
          typeof data?.downloads === "number" ? data.downloads : null,
        );
      } catch (error) {
        console.error("Error fetching download data:", error);
        setLayoutDownloads(null);
      }
    }

    load();
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/migrationsverket/midas",
        );
        const data = await response.json();
        setOpenIssues(
          typeof data?.open_issues_count === "number"
            ? data.open_issues_count
            : null,
        );
      } catch (error) {
        console.error("Error fetching download data:", error);
        setDownloads(null);
      }
    }

    load();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Grid>
        <GridItem size={"auto"}>
          <Card>
            <CardHeader
              heading="Nedladdningar @midas-ds/components"
              subHeading="Denna vecka"
            />
            <CardBody>
              <Text>
                {downloads !== null ? downloads.toLocaleString() : "Loading..."}
              </Text>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem size={"auto"}>
          <Card>
            <CardHeader
              heading="Nedladdningar @midas-ds/layout"
              subHeading="Denna vecka"
            />
            <CardBody>
              <Text>
                {layoutDownloads !== null
                  ? layoutDownloads.toLocaleString()
                  : "Loading..."}
              </Text>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem size={"auto"}>
          <Card>
            <CardHeader heading="Öppna issues på Github" />
            <CardBody>
              <Text>
                {openIssues !== null
                  ? openIssues.toLocaleString()
                  : "Loading..."}
              </Text>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem size={"auto"}>
          <Card>
            <CardHeader heading="Länkar" />
            <CardBody>
              <ButtonGroup>
                <LinkButton
                  href="https://designsystem.migrationsverket.se"
                  variant="primary"
                >
                  Docwebben
                </LinkButton>
                <LinkButton
                  href="https://designsystem.migrationsverket.se/storybook/?path=/docs/components-intro--docs"
                  variant="secondary"
                >
                  Storybook
                </LinkButton>
                <LinkButton
                  href="https://github.com/migrationsverket/midas"
                  variant="tertiary"
                >
                  Github
                </LinkButton>
              </ButtonGroup>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
}

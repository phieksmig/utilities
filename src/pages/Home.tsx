import { Heading, Text, LinkButton, ButtonGroup } from "@midas-ds/components";
import styles from "./Home.module.css";
export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <div>
        <Heading enableMargins isExpressive level={1}>
          Midas utility app
        </Heading>
        <Text>
          En sida med bra-att-ha-saker för Designsystem. <br />
          Byggd med Midas komponenter för Designsystemteamet.
        </Text>
      </div>
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
    </div>
  );
}

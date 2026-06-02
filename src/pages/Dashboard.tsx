import {
  LinkButton,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  CardActions,
  Link,
} from "@midas-ds/components";
import styles from "./Dashboard.module.css";
import { useNpmDownloads } from "../hooks/useNpmDownloads";
import { useGithubPullRequests } from "../hooks/useGithubPullRequests";
import { useGithubIssues } from "../hooks/useGithubIssues";
import { BigText } from "../components/BigText";

export default function Home() {
  const layoutDownloads = useNpmDownloads({
    packageName: "@midas-ds/layout",
    point: "last-week",
  });

  const componentDownloads = useNpmDownloads({
    packageName: "@midas-ds/components",
    point: "last-week",
  });

  const allTimeComponentDownloads = useNpmDownloads({
    packageName: "@midas-ds/components",
    point: "1000-01-01:3000-12-31",
  });

  const openPullRequests = useGithubPullRequests({
    repoName: "midas",
    orgName: "migrationsverket",
  });

  const openIssues = useGithubIssues({
    repoName: "midas",
    orgName: "migrationsverket",
  });

  return (
    <div className={styles.mainContainer}>
      <Grid>
        <GridItem size={"auto"}>
          <Card>
            <CardHeader
              heading="Nedladdningar @midas-ds/layout"
              subHeading="Totalt antal"
            />
            <CardBody>
              <BigText>
                {allTimeComponentDownloads !== null
                  ? allTimeComponentDownloads.toLocaleString()
                  : "Loading..."}
              </BigText>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem size={"auto"}>
          <Card>
            <CardHeader
              heading="Nedladdningar @midas-ds/components"
              subHeading="Denna vecka"
            />
            <CardBody>
              <BigText>
                {componentDownloads !== null
                  ? componentDownloads.toLocaleString()
                  : "Loading..."}
              </BigText>
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
              <BigText>
                {layoutDownloads !== null
                  ? layoutDownloads.toLocaleString()
                  : "Loading..."}
              </BigText>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem size={"auto"}>
          <Card>
            <CardHeader heading="Öppna issues på Github" />
            <CardBody>
              <BigText>
                {openIssues !== null
                  ? openIssues.toLocaleString()
                  : "Loading..."}
              </BigText>
            </CardBody>
            <CardActions>
              <Link
                href="https://github.com/migrationsverket/midas/issues"
                standalone
              >
                Gå till issues
              </Link>
            </CardActions>
          </Card>
        </GridItem>
        <GridItem size={"auto"}>
          <Card>
            <CardHeader heading="Öppna pull requests på Github" />
            <CardBody>
              <BigText>
                {openPullRequests !== null
                  ? openPullRequests.toLocaleString()
                  : "Loading..."}
              </BigText>
            </CardBody>
            <CardActions>
              <Link
                href="https://github.com/migrationsverket/midas/pulls"
                standalone
              >
                Gå till Pull Requests
              </Link>
            </CardActions>
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
              </ButtonGroup>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
}

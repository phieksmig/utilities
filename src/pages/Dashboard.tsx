import {
  LinkButton,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  CardActions,
  Link,
  Spinner,
  Checkbox,
  Heading,
} from "@midas-ds/components";
import styles from "./Dashboard.module.css";
import { useNpmDownloads } from "../hooks/useNpmDownloads";
import { useGithubPullRequests } from "../hooks/useGithubPullRequests";
import { useGithubIssues } from "../hooks/useGithubIssues";
import { BigText } from "../components/BigText";
import { AddTaskForm } from "../components/AddTaskForm";
import { useTodos } from "../hooks/useTodos";
import { Trash2 } from "lucide-react";

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

  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

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
                {allTimeComponentDownloads !== null ? (
                  allTimeComponentDownloads.toLocaleString()
                ) : (
                  <Spinner />
                )}
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
                {componentDownloads !== null ? (
                  componentDownloads.toLocaleString()
                ) : (
                  <Spinner />
                )}
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
                {layoutDownloads !== null ? (
                  layoutDownloads.toLocaleString()
                ) : (
                  <Spinner />
                )}
              </BigText>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem size={"auto"}>
          <Card>
            <CardHeader heading="Öppna issues på Github" />
            <CardBody>
              <BigText>
                {openIssues !== null ? (
                  openIssues.toLocaleString()
                ) : (
                  <Spinner />
                )}
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
                {openPullRequests !== null ? (
                  openPullRequests.toLocaleString()
                ) : (
                  <Spinner />
                )}
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
      <Grid>
        <GridItem size={"auto"}>
          <Card>
            <CardHeader heading="Att göra" />
            <CardBody>
              <AddTaskForm addTodo={addTodo} />
              <Heading level={3}>Dina uppgifter</Heading>
              {todos.map((todo) => (
                <div key={todo.id} className={styles.todoList}>
                  <Checkbox
                    isSelected={todo.isCompleted}
                    onChange={() => toggleTodo(todo.id)}
                  >
                    {todo.title}
                  </Checkbox>
                  <p>{todo.description}</p>

                  <Button
                    variant="icon"
                    icon={Trash2}
                    onClick={() => deleteTodo(todo.id)}
                  ></Button>
                </div>
              ))}
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
}

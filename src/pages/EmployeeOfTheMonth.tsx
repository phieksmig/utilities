import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from "@midas-ds/components";
import { Sparkles } from "lucide-react";
import styles from "./EmployeeOfTheMonth.module.css";

const profileImage =
  "https://www.figma.com/api/mcp/asset/02a38d04-dc5d-466a-88bc-4ac74e28ffc6";

export default function EmployeeOfTheMonth() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.heroHeader}>
        <Heading enableMargins isExpressive level={1}>
          Månadens anställd
        </Heading>
        <p className={styles.heroText}>
          Vi firar de som gör skillnad i vårt dagliga arbete.
        </p>
      </div>

      <div className={styles.contentGrid}>
        <Card className={styles.profileCard}>
          <CardHeader
            heading="Anna Lindström"
            subHeading="Senior Produktdesigner"
          />
          <CardBody>
            <div className={styles.imageWrap}>
              <img
                src={profileImage}
                alt="Anna Lindström"
                className={styles.profileImage}
              />
            </div>
            <p className={styles.quote}>
              “Jag är oerhört tacksam för det förtroende jag fått. Det är ett
              privilegium att få jobba med ett så engagerat och kreativt team
              varje dag.”
            </p>
          </CardBody>
        </Card>

        <div className={styles.statsSection}>
          <Heading level={2}>Framgångar under månaden</Heading>

          <div className={styles.statsGrid}>
            <Card className={styles.statCard}>
              <CardHeader heading="12" subHeading="Antal projekt" />
              <CardBody>
                <p className={styles.statText}>Levererade med 100% kvalitet</p>
              </CardBody>
            </Card>

            <Card className={styles.statCard}>
              <CardHeader heading="+92" subHeading="NPS-poäng" />
              <CardBody>
                <p className={styles.statText}>Rekordhög kundnöjdhet</p>
              </CardBody>
            </Card>

            <Card className={styles.statCard}>
              <CardHeader heading="4.5/5" subHeading="Teamets feedback" />
              <CardBody>
                <p className={styles.statText}>Bästa samarbetspartner</p>
              </CardBody>
            </Card>

            <Card className={styles.statCard}>
              <CardHeader heading="47" subHeading="Genomförda möten" />
              <CardBody>
                <p className={styles.statText}>Alltid i tid</p>
              </CardBody>
            </Card>

            <Card className={styles.statCard}>
              <CardHeader heading="8" subHeading="Mentorerade kollegor" />
              <CardBody>
                <p className={styles.statText}>Ny rekord i år</p>
              </CardBody>
            </Card>

            <Card className={styles.statCard}>
              <CardHeader heading="5" subHeading="Interna utbildningar" />
              <CardBody>
                <p className={styles.statText}>Certifierad inom 3 områden</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      <section className={styles.nominationSection}>
        <Heading level={2}>Nominerade kollegor</Heading>

        <div className={styles.nomineeGrid}>
          <Card className={styles.nomineeCard}>
            <CardHeader heading="Erik Svensson" subHeading="Projektledare" />
            <CardBody>
              <p className={styles.nomineeText}>
                Erik har varit en stabil kraft i projektet och lyckats
                koordinera flera team på ett effektivt sätt.
              </p>
            </CardBody>
            <div className={styles.cardActions}>
              <Button icon={Sparkles}>Ge en high five</Button>
            </div>
          </Card>

          <Card className={styles.nomineeCard}>
            <CardHeader heading="Sofia Berg" subHeading="Frontend-utvecklare" />
            <CardBody>
              <p className={styles.nomineeText}>
                Sofia har levererat högkvalitativ kod och hjälpt till att
                förbättra användarupplevelsen i appen.
              </p>
            </CardBody>
            <div className={styles.cardActions}>
              <Button icon={Sparkles}>Ge en high five</Button>
            </div>
          </Card>

          <Card className={styles.nomineeCard}>
            <CardHeader heading="Marcus Johansson" subHeading="Kundsupport" />
            <CardBody>
              <p className={styles.nomineeText}>
                Marcus har gett exceptionell service och hjälpt kunder att lösa
                komplexa problem på rekordtid.
              </p>
            </CardBody>
            <div className={styles.cardActions}>
              <Button icon={Sparkles}>Ge en high five</Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

import {
  SearchField,
  InfoBanner,
  Heading,
  Text,
  Button,
  toastQueue,
  Accordion,
  AccordionItem,
} from "@midas-ds/components";
import { useState, useMemo } from "react";
import {
  getAllColorTokens,
  getReferenceTokenNamesForHex,
  getSemanticTokensForReferences,
} from "../utils/tokenUtils";
import styles from "./TokenFinder.module.css";
import { Copy } from "lucide-react";

/**
 * Reverse token lookup page that lets the user search a color value and see
 * which design tokens reference it.
 */
export default function TokenFinder() {
  const [hexInput, setHexInput] = useState<string>("");

  // Load the available CSS token values once so matching can reuse them.
  const allTokens = useMemo(() => getAllColorTokens(), []);

  // Find the direct reference tokens that use the entered color.
  const matchedReferenceTokenNames = useMemo(
    () => getReferenceTokenNamesForHex(hexInput, allTokens),
    [hexInput, allTokens],
  );

  // Build the matched token objects that include both the name and value.
  const matchedTokens = useMemo(
    () =>
      matchedReferenceTokenNames.map((tokenName) => ({
        name: tokenName,
        value: allTokens[tokenName],
      })),
    [matchedReferenceTokenNames, allTokens],
  );

  // Resolve semantic token matches based on the found reference tokens.
  const semanticTokens = useMemo(
    () => getSemanticTokensForReferences(matchedReferenceTokenNames, allTokens),
    [matchedReferenceTokenNames, allTokens],
  );

  // Separate semantic matches that are relevant in light mode.
  const semanticTokensLight = useMemo(
    () => semanticTokens.filter((token) => token.lightMatch),
    [semanticTokens],
  );

  // Separate semantic matches that are relevant in dark mode.
  const semanticTokensDark = useMemo(
    () => semanticTokens.filter((token) => token.darkMatch),
    [semanticTokens],
  );

  // Check whether the current input is a valid hex color value.
  const isValidHex = useMemo(() => {
    const hexRegex = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    return hexInput === "" || hexRegex.test(hexInput);
  }, [hexInput]);

  return (
    <div className={styles.mainContainer}>
      <div>
        <Heading enableMargins isExpressive level={1}>
          Hitta tokens från färgkod
        </Heading>
        <div className={styles.infoContainer}>
          <Text>
            Sök efter en HEX-kod för att se vilka design tokens som använder den
            färgen
          </Text>
          <Accordion>
            <AccordionItem id="more-info" title="Så funkar det">
              Funktionen söker i :root efter den angivna färgkoden. Om den
              hittar en matchande referenstoken så används det tokennamnet för
              att söka efter semantiska tokens som refererar till den token. Det
              går att söka både med och utan # i början av hex-koden och både 3-
              och 6-siffriga hex-koder stöds.
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className={styles.searchContainer}>
        <SearchField
          placeholder="t.ex. #f2f2f2 eller fff"
          onSubmit={(value) => setHexInput(value)}
        />
      </div>
      {/* Om vi har träffar */}
      {matchedTokens.length > 0 && (
        <div>
          <Heading enableMargins level={3}>
            Hittade {matchedTokens.length} matchande{" "}
            {matchedTokens.length === 1 ? "referenstoken" : "referenstokens"}:
          </Heading>

          <div>
            {matchedTokens.map((token) => (
              <div key={token.name}>
                <div>
                  <div>
                    <p>{token.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {semanticTokensLight.length > 0 && (
        <div>
          <Heading enableMargins level={3}>
            Semantiska tokens som använder den färgen i light theme:
          </Heading>

          <div>
            {semanticTokensLight.map((token) => (
              <div key={token.name} className={styles.tokenContainer}>
                <Text>{token.name}</Text>
                <Button
                  variant="icon"
                  size="medium"
                  icon={Copy}
                  onPress={() => {
                    navigator.clipboard.writeText(token.name);
                    toastQueue.add(
                      {
                        type: "success",
                        message:
                          `${token.name}` + " har kopierats till urklipp",
                      },
                      { timeout: 5000 },
                    );
                  }}
                  aria-label={`Kopiera ${token.name}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {semanticTokensDark.length > 0 && (
        <div>
          <Heading enableMargins level={3}>
            Semantiska tokens som använder den färgen i dark theme:
          </Heading>

          <div>
            {semanticTokensDark.map((token) => (
              <div key={token.name} className={styles.tokenContainer}>
                <Text>{token.name}</Text>
                <Button
                  variant="icon"
                  size="medium"
                  icon={Copy}
                  onPress={() => {
                    navigator.clipboard.writeText(token.name);
                    toastQueue.add(
                      {
                        type: "success",
                        message:
                          `${token.name}` + " har kopierats till urklipp",
                      },
                      { timeout: 5000 },
                    );
                  }}
                  aria-label={`Kopiera ${token.name}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Om användaren har skrivit en giltig HEX men vi inte har några träffar */}
      {hexInput && isValidHex && matchedTokens.length === 0 && (
        <InfoBanner type="info">
          Det är inga tokens i systemet som använder färgen{" "}
          <strong>{hexInput}</strong>.
        </InfoBanner>
      )}
    </div>
  );
}

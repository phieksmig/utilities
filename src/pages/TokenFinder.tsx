import { SearchField, InfoBanner, Heading } from "@midas-ds/components";
import { useState, useMemo } from "react";
import {
  getAllColorTokens,
  getReferenceTokenNamesForHex,
  getSemanticTokensForReferences,
} from "../utils//tokenUtils";

export default function TokenFinder() {
  const [hexInput, setHexInput] = useState<string>("");

  // Indexera alla tokens från theme.css (useMemo så vi inte gör om detta vid varje keystroke)
  const allTokens = useMemo(() => getAllColorTokens(), []);

  const matchedReferenceTokenNames = useMemo(
    () => getReferenceTokenNamesForHex(hexInput, allTokens),
    [hexInput, allTokens],
  );

  const matchedTokens = useMemo(
    () =>
      matchedReferenceTokenNames.map((tokenName) => ({
        name: tokenName,
        value: allTokens[tokenName],
      })),
    [matchedReferenceTokenNames, allTokens],
  );

  const semanticTokens = useMemo(
    () => getSemanticTokensForReferences(matchedReferenceTokenNames, allTokens),
    [matchedReferenceTokenNames, allTokens],
  );

  const semanticTokensLight = useMemo(
    () => semanticTokens.filter((token) => token.lightMatch),
    [semanticTokens],
  );

  const semanticTokensDark = useMemo(
    () => semanticTokens.filter((token) => token.darkMatch),
    [semanticTokens],
  );

  // Validera om inputen ser ut som en giltig färg (3 eller 6 tecken hex)
  const isValidHex = useMemo(() => {
    const hexRegex = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    return hexInput === "" || hexRegex.test(hexInput);
  }, [hexInput]);

  return (
    <div className="space-y-6 p-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Reverse Token Lookup</h1>
        <p className="text-muted text-sm mt-1">
          Skriv in en HEX-kod för att se vilka design tokens i{" "}
          <code className="bg-muted px-1 rounded">theme.css</code> som använder
          just den färgen.
        </p>
      </div>

      <div className="space-y-4">
        <SearchField
          placeholder="t.ex. #0056b3 eller fff"
          onSubmit={(value) => setHexInput(value)}
        />

        {/* Om vi har träffar */}
        {matchedTokens.length > 0 && (
          <div className="mt-6 space-y-3">
            <span className="text-xs uppercase font-semibold text-muted tracking-wider">
              Hittade {matchedTokens.length} matchande{" "}
              {matchedTokens.length === 1 ? "token" : "tokens"}:
            </span>

            <div className="grid gap-2">
              {matchedTokens.map((token) => (
                <div
                  key={token.name}
                  className="flex items-center justify-between p-3 border rounded-lg bg-neutral-lightest"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-mono font-bold text-sm">
                        {token.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {semanticTokensLight.length > 0 && (
          <div className="mt-6 space-y-3">
            <Heading level={3}>
              Semantic tokens matching in light theme:
            </Heading>

            <div className="grid gap-2">
              {semanticTokensLight.map((token) => (
                <div
                  key={token.name}
                  className="flex items-center justify-between p-3 border rounded-lg bg-neutral-lightest"
                >
                  <div className="flex flex-col gap-1">
                    <p className="font-mono font-bold text-sm">{token.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {semanticTokensDark.length > 0 && (
          <div className="mt-6 space-y-3">
            <Heading level={3}>Semantic tokens matching in dark theme:</Heading>

            <div className="grid gap-2">
              {semanticTokensDark.map((token) => (
                <div key={token.name}>
                  <div className="flex flex-col gap-1">
                    <p className="font-mono font-bold text-sm">{token.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Om användaren har skrivit en giltig HEX men vi inte har några träffar */}
        {hexInput && isValidHex && matchedTokens.length === 0 && (
          <InfoBanner type="info">
            Inga existerande tokens i systemet använder färgen{" "}
            <strong>{hexInput}</strong>.
          </InfoBanner>
        )}
      </div>
    </div>
  );
}

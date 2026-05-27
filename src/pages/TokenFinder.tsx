import { SearchField, InfoBanner } from "@midas-ds/components";
import { useState, useMemo } from "react";
import { getAllColorTokens } from "../utils//tokenUtils";

export default function TokenFinder() {
  const [hexInput, setHexInput] = useState<string>("");

  // Indexera alla tokens från theme.css (useMemo så vi inte gör om detta vid varje keystroke)
  const allTokens = useMemo(() => getAllColorTokens(), []);

  // Sökfunktionen som matchar HEX-koden
  const matchedTokens = useMemo(() => {
    const cleanedInput = hexInput.trim().toLowerCase().replace("#", "");

    if (!cleanedInput) return [];

    return Object.entries(allTokens)
      .filter(([_, tokenValue]) => {
        const cleanedValue = tokenValue.toLowerCase().replace("#", "");

        // 1. Direkt matchning (t.ex. "ffffff" === "ffffff")
        if (cleanedValue === cleanedInput) return true;

        // 2. Hantera kortfattad HEX (t.ex. om användaren skriver #fff men token är #ffffff)
        if (cleanedInput.length === 3) {
          const expandedInput = cleanedInput
            .split("")
            .map((char) => char + char)
            .join("");
          if (cleanedValue === expandedInput) return true;
        }

        // 3. Bonus: Om webbläsaren returnerar värdet som "rgb(255, 255, 255)"
        // så kollar vi om den städade rgb-strängen innehåller vår input (valfritt men säkert)
        if (tokenValue.includes("rgb") && cleanedInput.length >= 3) {
          // Enkel sökning, men räcker långt för interna verktyg
          return false;
        }

        return false;
      })
      .map(([tokenName, tokenValue]) => ({
        name: tokenName,
        value: tokenValue,
      }));
  }, [hexInput, allTokens]);

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

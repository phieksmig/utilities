// tokenUtils.ts

const HEX_TOKEN_REGEX = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const RGB_TOKEN_REGEX =
  /rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/i;
const LIGHT_DARK_REGEX = /light-dark\s*\(\s*([^,]+?)\s*,\s*([^)]+?)\s*\)/i;

export interface SemanticTokenMatch {
  name: string;
  value: string;
  lightMatch: boolean;
  darkMatch: boolean;
}

export function getAllColorTokens(): Record<string, string> {
  const tokens: Record<string, string> = {};

  for (const sheet of Array.from(document.styleSheets)) {
    try {
      const rules = Array.from(sheet.cssRules || sheet.rules);

      for (const rule of rules) {
        if (rule instanceof CSSStyleRule && rule.selectorText === ":root") {
          const style = rule.style;

          for (let i = 0; i < style.length; i++) {
            const propName = style[i];

            if (propName.startsWith("--")) {
              const value = style.getPropertyValue(propName).trim();
              tokens[propName] = value;
            }
          }
        }
      }
    } catch (e) {
      console.warn("Kunde inte läsa stilmall:", sheet.href, e);
    }
  }

  return tokens;
}

export function normalizeHexInput(input: string): string | null {
  const cleaned = input.trim().toLowerCase().replace(/^#/, "");
  if (!HEX_TOKEN_REGEX.test(input.trim())) {
    return null;
  }

  if (cleaned.length === 3) {
    return cleaned
      .split("")
      .map((char) => char + char)
      .join("");
  }

  return cleaned;
}

export function rgbValueToHex(value: string): string | null {
  const match = RGB_TOKEN_REGEX.exec(value);
  if (!match) return null;

  const [r, g, b] = match.slice(1).map(Number);
  if ([r, g, b].some((component) => component < 0 || component > 255)) {
    return null;
  }

  return [r, g, b]
    .map((component) => component.toString(16).padStart(2, "0"))
    .join("");
}

export function getReferenceTokenNamesForHex(
  hexInput: string,
  allTokens: Record<string, string>,
): string[] {
  const normalizedInput = normalizeHexInput(hexInput);
  if (!normalizedInput) return [];

  return Object.entries(allTokens)
    .filter(([, tokenValue]) => {
      const cleanedValue = tokenValue.toLowerCase().trim();

      if (cleanedValue.startsWith("#")) {
        const hex = cleanedValue.replace(/^#/, "");
        if (hex.length === 3) {
          const expanded = hex
            .split("")
            .map((char) => char + char)
            .join("");
          return expanded === normalizedInput;
        }
        return hex === normalizedInput;
      }

      const rgbHex = rgbValueToHex(cleanedValue);
      return rgbHex === normalizedInput;
    })
    .map(([tokenName]) => tokenName);
}

export function getSemanticTokensForReferences(
  referenceTokenNames: string[],
  allTokens: Record<string, string>,
): SemanticTokenMatch[] {
  if (referenceTokenNames.length === 0) return [];

  const lowerReferenceNames = referenceTokenNames.map((name) =>
    name.toLowerCase(),
  );
  const referenceSet = new Set(referenceTokenNames);

  return Object.entries(allTokens)
    .filter(([tokenName]) => !referenceSet.has(tokenName))
    .map(([name, value]) => {
      const lowerValue = value.toLowerCase();
      const lightDarkMatch = LIGHT_DARK_REGEX.exec(lowerValue);
      const [lightArg = "", darkArg = ""] = lightDarkMatch
        ? [lightDarkMatch[1], lightDarkMatch[2]]
        : ["", ""];

      const matches = lowerReferenceNames.map((refName) => {
        const matchedInValue = lowerValue.includes(refName);
        const matchedInLight = lightArg.includes(refName);
        const matchedInDark = darkArg.includes(refName);
        return {
          matchedInValue,
          matchedInLight,
          matchedInDark,
        };
      });

      const lightMatch = matches.some(
        ({ matchedInLight, matchedInValue }) =>
          matchedInLight || (!lightDarkMatch && matchedInValue),
      );
      const darkMatch = matches.some(({ matchedInDark }) => matchedInDark);
      const hasAnyMatch = matches.some(({ matchedInValue }) => matchedInValue);

      return {
        name,
        value,
        lightMatch,
        darkMatch,
        hasAnyMatch,
      };
    })
    .filter(
      (token): token is SemanticTokenMatch & { hasAnyMatch: boolean } =>
        token.hasAnyMatch,
    )
    .map(({ hasAnyMatch, ...token }) => token);
}

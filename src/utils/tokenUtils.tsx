// tokenUtils.ts

// En funktion som letar upp alla CSS-variabler som börjar på "--" under :root
export function getAllColorTokens(): Record<string, string> {
  const tokens: Record<string, string> = {};

  // Gå igenom alla stilmallar som är laddade i dokumentet
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      // Vi är bara intresserade av reglerna (rules) i CSS-filen
      const rules = Array.from(sheet.cssRules || sheet.rules);

      for (const rule of rules) {
        // Vi letar specifikt efter ":root"-väljaren där theme.css har sina tokens
        if (rule instanceof CSSStyleRule && rule.selectorText === ":root") {
          const style = rule.style;

          // Gå igenom alla egenskaper i den :root-regeln
          for (let i = 0; i < style.length; i++) {
            const propName = style[i];

            // Om det är en CSS-variabel (börjar på --)
            if (propName.startsWith("--")) {
              const value = style.getPropertyValue(propName).trim();
              tokens[propName] = value;
            }
          }
        }
      }
    } catch (e) {
      // Cross-origin-säkerhet kan blockera vissa externa stylesheets, så vi fångar och ignorerar dessa fel
      console.warn("Kunde inte läsa stilmall:", sheet.href, e);
    }
  }

  return tokens;
}

import { useState } from "react";
import { CalendarDate } from "@internationalized/date";

export function useTwoDigitYear(initialValue: CalendarDate | null = null) {
  const [value, setValue] = useState<CalendarDate | null>(initialValue);

  const onChange = (newValue: CalendarDate | null) => {
    if (!newValue) {
      setValue(null);
      return;
    }

    // Om årtalet är mindre än 100 har användaren skrivit 2 siffror
    if (newValue.year < 100) {
      const currentYear = new Date().getFullYear();
      const currentCentury = Math.floor(currentYear / 100) * 100; // 2000

      let correctedYear = newValue.year;

      // Brytpunkt: t.ex. år 2026 + 20 = 46.
      // 00-46 blir 20xx, 47-99 blir 19xx.
      if (correctedYear > (currentYear % 100) + 20) {
        correctedYear += currentCentury - 100;
      } else {
        correctedYear += currentCentury;
      }

      // Skapa det korrigerade datumet
      setValue(new CalendarDate(correctedYear, newValue.month, newValue.day));
    } else {
      // Om det redan är 4 siffror, spara som vanligt
      setValue(newValue);
    }
  };

  return { value, onChange };
}

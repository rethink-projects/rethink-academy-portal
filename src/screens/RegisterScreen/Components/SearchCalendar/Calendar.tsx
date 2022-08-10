import * as React from "react";

//CSS
import "rsuite/dist/rsuite.min.css";
import "./Calendar.css";

// Calendar
import { useEffect, useState } from "react";
import { Calendar } from "rsuite";

export default function CalendarComponent() {
  const [dateRange, setDateRange] = useState<Date[]>([]);

  const selectRange = (date: Date) => {
    if (dateRange.length === 1) {
      return setDateRange([...dateRange, date]);
    }
    return setDateRange([date]);
  };

  // const selectRange = (date: Date) => {
  //   if (dateRange.length === 0) {
  //     setDateRange([date]);
  //   }

  //   if (dateRange.length === 1) {
  //     setDateRange([...dateRange, date]);
  //   }

  //   if (dateRange.length > 1) {
  //     setDateRange([date]);
  //   }
  // };

  return (
    <div>
      <Calendar
        compact
        bordered
        dateRange={dateRange}
        onSelect={(date: Date) => selectRange(date)}
      />
    </div>
  );
}

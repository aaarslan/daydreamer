import { useState } from "react";
import { Datepicker } from "../lib";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | Date[] | null>(null);
  const [selectionMode, setSelectionMode] = useState<
    "single" | "range" | "multiple"
  >("single");

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          color: "#d2e0fd",
          gap: 400,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",

            gap: 8,
          }}
        >
          <h1>Daydreamer</h1>
          <div>
            <button type="button" onClick={() => setSelectionMode("single")}>
              Single
            </button>
            <button type="button" onClick={() => setSelectionMode("range")}>
              Range
            </button>
            <button type="button" onClick={() => setSelectionMode("multiple")}>
              Multiple
            </button>
          </div>
          <Datepicker
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder="Select date(s)"
            selectionMode={selectionMode}
            numberOfMonths={1}
          />
        </div>
        <div>
          <p>
            Selected:{" "}
            {Array.isArray(selectedDate)
              ? selectedDate.map((date, index) => (
                  <p key={index}>{date.toString()}</p>
                ))
              : "None"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import { Datepicker } from "../lib";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          color: "#d2e0fd",
        }}
      >
        <h1>Daydreamer</h1>
        <h3>
          Selected Date:{" "}
          <span
            style={{
              color: "#f0f0f0",
              fontSize: "1.5em",
            }}
          >
            {selectedDate.toDateString()}
          </span>
        </h3>
      </div>
      <Datepicker
        value={selectedDate}
        onChange={(date) => setSelectedDate(date as Date)}
        numberOfMonths={12}
        selectionMode="single"
        customStyles={{
          container: {
            height: "auto",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            width: "1200px",
          },
        }}
      />
    </div>
  );
}

export default App;

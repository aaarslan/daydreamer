import { useState } from "react";
import { Datepicker } from "../lib";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | Date[] | null>(null);
  const [selectionMode, setSelectionMode] = useState<
    "single" | "range" | "multiple"
  >("single");
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleDateChange = (date: Date | Date[] | null) => {
    setSelectedDate(date);
    setError("");
  };

  const CalendarIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      role="presentation"
    >
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.89-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
    </svg>
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          color: "#d2e0fd",
          gap: 40,
          padding: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: 16,
            maxWidth: "400px",
          }}
        >
          <h1>Daydreamer - Enhanced DatePicker</h1>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setSelectionMode("single")}
              style={{
                backgroundColor:
                  selectionMode === "single" ? "#3b82f6" : "transparent",
                border: "1px solid #3b82f6",
                color: selectionMode === "single" ? "white" : "#3b82f6",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              Single
            </button>
            <button
              type="button"
              onClick={() => setSelectionMode("range")}
              style={{
                backgroundColor:
                  selectionMode === "range" ? "#3b82f6" : "transparent",
                border: "1px solid #3b82f6",
                color: selectionMode === "range" ? "white" : "#3b82f6",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              Range
            </button>
            <button
              type="button"
              onClick={() => setSelectionMode("multiple")}
              style={{
                backgroundColor:
                  selectionMode === "multiple" ? "#3b82f6" : "transparent",
                border: "1px solid #3b82f6",
                color: selectionMode === "multiple" ? "white" : "#3b82f6",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              Multiple
            </button>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setSize("small")}
              style={{
                backgroundColor: size === "small" ? "#10b981" : "transparent",
                border: "1px solid #10b981",
                color: size === "small" ? "white" : "#10b981",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              Small
            </button>
            <button
              type="button"
              onClick={() => setSize("medium")}
              style={{
                backgroundColor: size === "medium" ? "#10b981" : "transparent",
                border: "1px solid #10b981",
                color: size === "medium" ? "white" : "#10b981",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              Medium
            </button>
            <button
              type="button"
              onClick={() => setSize("large")}
              style={{
                backgroundColor: size === "large" ? "#10b981" : "transparent",
                border: "1px solid #10b981",
                color: size === "large" ? "white" : "#10b981",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              Large
            </button>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 2000);
              }}
              style={{
                backgroundColor: "#f59e0b",
                border: "1px solid #f59e0b",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              Test Loading
            </button>
            <button
              type="button"
              onClick={() =>
                setError(error ? "" : "Please select a valid date")
              }
              style={{
                backgroundColor: "#ef4444",
                border: "1px solid #ef4444",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              Toggle Error
            </button>
          </div>

          <Datepicker
            value={selectedDate}
            onChange={handleDateChange}
            placeholder={`Select ${selectionMode} date${selectionMode !== "single" ? "s" : ""}`}
            selectionMode={selectionMode}
            numberOfMonths={1}
            size={size}
            loading={loading}
            error={error}
            icon={<CalendarIcon />}
            rangeSeparator=" → "
            required={true}
          />
        </div>

        <div style={{ textAlign: "center", maxWidth: "600px" }}>
          <h3>Selected Value:</h3>
          <div
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              padding: "1rem",
              borderRadius: "8px",
              fontFamily: "monospace",
              fontSize: "0.9rem",
            }}
          >
            {selectedDate ? (
              Array.isArray(selectedDate) ? (
                <div>
                  <strong>Array ({selectedDate.length} dates):</strong>
                  {selectedDate.map((date, index) => (
                    <div key={index} style={{ marginLeft: "1rem" }}>
                      [{index}]: {date.toLocaleDateString()}
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <strong>Single Date:</strong>{" "}
                  {selectedDate.toLocaleDateString()}
                </div>
              )
            ) : (
              <em>No date selected</em>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

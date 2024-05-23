import { Datepicker } from "../lib";
function App() {
  const theme = {
    day: "#000000",
    selectedDay: "#EFEFEF",
    disabledDay: "#666666",
    week: "",
    selectedWeek: "",
    disabledWeek: "",
    month: "",
    selectedMonth: "",
    disabledMonth: "",
    year: "",
    selectedYear: "",
    disabledYear: "",
  };
  return (
    <div style={{ width: "300px" }}>
      <Datepicker theme={theme} />
    </div>
  );
}

export default App;

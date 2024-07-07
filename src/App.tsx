// import { Datepicker } from "../lib";
import { Datepicker } from "../lib";
function App() {
  // const theme = {
  //   day: "#000000",
  //   selectedDay: "#EFEFEF",
  //   disabledDay: "#666666",
  //   week: "",
  //   selectedWeek: "",
  //   disabledWeek: "",
  //   month: "",
  //   selectedMonth: "",
  //   disabledMonth: "",
  //   year: "",
  //   selectedYear: "",
  //   disabledYear: "",
  // };
  return (
    <div style={{ width: "200px", fontSize: "16px" }}>
      {/* <Datepicker theme={theme} /> */}
      <Datepicker onChange={() => {}} selectionMode="range" />
    </div>
  );
}

export default App;

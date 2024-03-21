import { Datepicker } from "../lib";
function App() {
  return (
    <div style={{ width: "300px" }}>
      <Datepicker onDateChange={(e) => console.log(e)} />
    </div>
  );
}

export default App;

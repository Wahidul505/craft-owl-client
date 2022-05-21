import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Home/Landing";

function App() {
  return (
    <div data-theme="light">
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;

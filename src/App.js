import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Home/Landing";
import Purchase from "./Pages/Purchase/Purchase";
import Footer from "./Pages/Shared/Footer";
import NavBar from "./Pages/Shared/NavBar";

function App() {
  return (
    <div className="px-10">
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/purchase" element={<Purchase />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

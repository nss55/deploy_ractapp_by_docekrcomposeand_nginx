import logo from "./logo.svg";
import "./App.css";
import Demofile from "./Componnet/Demofile";
import Demofile2 from "./Componnet/Demofile2";
import Login from "./Componnet/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/bot" element={<Demofile />} />
        {/* <Route path="/demofile2" element={<Demofile2 />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

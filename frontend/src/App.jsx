import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Analytics from "./components/analytics/Analytics";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import DealsPage from "./pages/Deal/Deal";
import TemplatesPage from "./pages/Template/Template"; // Assure-toi que le chemin est correct
import DealForm from "./components/form/DealForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/DealForm" element={<DealForm />} />
      </Routes>
    </Router>
  );
}

export default App;
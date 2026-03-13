import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import DealsPage from "./pages/Deal/Deal";
import TemplatesPage from "./pages/Template/Template"; 
import CreateTemplate from "./pages/Template/CreateTemplate";
import EditTemplate from "./pages/Template/EditTemplate";
import DealForm from "./components/form/DealForm"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/templates/create" element={<CreateTemplate />} />
        <Route path="/templates/edit/:templateId" element={<EditTemplate />} />
        <Route path="/DealForm" element={<DealForm />} />
        <Route path="/DealForm/:dealId?" element={<DealForm />} />
      </Routes>
    </Router>
  );
}

export default App;
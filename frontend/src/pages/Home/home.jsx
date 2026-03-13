import { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/NavBar";
import { fetchDeals } from "../../services/Deals";
import { fetchTemplates } from "../../services/Templates";

function Home() {
  const [deals, setDeals] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [clientFilter, setClientFilter] = useState("");
  const [dateType, setDateType] = useState("createdAt");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const [dealsData, templatesData] = await Promise.all([
          fetchDeals(),
          fetchTemplates()
        ]);
        setDeals(dealsData);
        setTemplates(templatesData);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  const getValue = (obj, path) => path.split('.').reduce((acc, part) => acc && acc[part], obj);

  const renderValue = (val) => {
    if (val === undefined || val === null || val === "") return "N/A";
    if (Array.isArray(val)) {
      if (val.length === 0) return "Aucun";
      if (typeof val[0] === 'object') {
        return val.map(c => `${c.firstName || ''} ${c.lastName || ''}`).join(", ");
      }
      return val.join(", ");
    }
    if (typeof val === "boolean") return val ? "Oui" : "Non";
    return val.toString();
  };

  const filteredDeals = deals.filter(deal => {
    const matchesClient = clientFilter === "" || deal.clientName === clientFilter;
    const dealDate = new Date(deal[dateType]);
    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      if (dealDate < start) return false;
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      if (dealDate > end) return false;
    }
    return matchesClient;
  });

  const allFields = selectedTemplate 
    ? selectedTemplate.sections.reduce((acc, section) => [...acc, ...section.fields], [])
    : [];

  return (
    <>
      <Navbar />
      
      <div className="filter-overlay">
        <select value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}>
          <option value="">Tous les clients</option>
          {[...new Set(deals.map(d => d.clientName))].map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <div className="date-group">
          <select value={dateType} onChange={(e) => setDateType(e.target.value)}>
            <option value="createdAt">Création</option>
            <option value="expectedCloseDate">Closing</option>
          </select>
          <div className="date-inputs">
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
      </div>

      <div className={`home-container ${selectedTemplate ? "shifted" : ""}`}>
        <div className="templates-sidebar">
          <h2>Templates</h2>
          {templates.map((t) => (
            <button 
              key={t._id} 
              className={`template-btn ${selectedTemplate?._id === t._id ? "active" : ""}`}
              onClick={() => setSelectedTemplate(t)}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="deals-display">
          {selectedTemplate ? (
            <div className="vertical-table-wrapper">
              {filteredDeals.map((deal) => (
                <table key={deal._id} className="vertical-deal-table">
                  <thead>
                    <tr><th colSpan="2">{deal.title}</th></tr>
                  </thead>
                  <tbody>
                    {allFields.map((field, idx) => (
                      <tr key={idx}>
                        <td className="field-label">{selectedTemplate.labels?.[field] || field}</td>
                        <td className="field-value">{renderValue(getValue(deal, field))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </div>
          ) : (
            <div className="no-data">Sélectionnez un template pour afficher les deals.</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
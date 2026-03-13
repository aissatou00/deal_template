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

  const clients = [...new Set(deals.map(d => d.clientName))];

  return (
    <>
      <Navbar />
      
      <div className="filter-overlay">
        <select value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}>
          <option value="">Tous les clients</option>
          {clients.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <div className="date-group">
          <select value={dateType} onChange={(e) => setDateType(e.target.value)}>
            <option value="createdAt">Par date de création</option>
            <option value="expectedCloseDate">Par date de closing</option>
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
          <button className="create-btn" onClick={() => window.location.href='/templates'}>
            + Create New Template
          </button>
        </div>

        <div className="deals-display">
          {selectedTemplate ? (
            filteredDeals.length > 0 ? (
              filteredDeals.map((deal) => (
                <div key={deal._id} className="deal-card">
                  <h2>{deal.title}</h2>
                  {selectedTemplate.sections.map((section, sIdx) => (
                    <div key={sIdx} className="section-box">
                      <h3>{section.name}</h3>
                      <div className="fields-grid">
                        {section.fields.map((field) => (
                          <p key={field}>
                            <strong>{selectedTemplate.labels?.[field] || field}:</strong>{" "}
                            {renderValue(getValue(deal, field))}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="no-data">Aucun deal trouvé pour ces critères.</div>
            )
          ) : (
            <div className="no-data">Sélectionnez un template à gauche pour afficher les deals.</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
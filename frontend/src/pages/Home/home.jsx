import { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/NavBar";
import { fetchDeals } from "../../services/Deals";
import { fetchTemplates } from "../../services/Templates";

function Home() {
  const [deals, setDeals] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const [dealsData, templatesData] = await Promise.all([fetchDeals(), fetchTemplates()]);
        setDeals(dealsData);
        setTemplates(templatesData);
      } catch (err) { console.error(err); }
    };
    getData();
  }, []);

  const getValue = (obj, path) => path.split('.').reduce((acc, part) => acc && acc[part], obj);

  const renderValue = (val) => {
    if (val === undefined || val === null) return "N/A";

    if (Array.isArray(val)) {
      if (val.length === 0) return "Aucun";
      
      if (typeof val[0] === 'object') {
        return val.map(c => `${c.firstName} ${c.lastName}`).join(", ");
      }
      
      return val.join(", ");
    }

    if (typeof val === "boolean") return val ? "Oui" : "Non";

    return val.toString();
  };

  return (
    <>
      <Navbar />
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

        {selectedTemplate && (
          <div className="deals-display">
            {deals.map((deal) => (
              <div key={deal._id} className="deal-card">
                <h2>{deal.title}</h2>
                {selectedTemplate.sections.map((section, sIdx) => (
                  <div key={sIdx} className="section-box">
                    <h3>{section.name}</h3>
                    {section.fields.map((field) => (
                      <p key={field}>
                        <strong>{selectedTemplate.labels[field] || field}:</strong>{" "}
                        {renderValue(getValue(deal, field))}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
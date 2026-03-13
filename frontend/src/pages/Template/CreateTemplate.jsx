import { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/NavBar";
import { createTemplate, fetchTemplateFields } from "../../services/Templates";
import { useNavigate } from "react-router-dom";

function CreateTemplate() {
  const [name, setName] = useState("");
  const [sections, setSections] = useState([]);
  const [newSectionName, setNewSectionName] = useState("");
  const [availableFields, setAvailableFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getFields = async () => {
      try {
        const fields = await fetchTemplateFields();
        setAvailableFields(fields);
      } catch (err) {
        console.error("Erreur récupération champs templates :", err);
      }
    };
    getFields();
  }, []);

  const toggleField = (field) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const addSection = () => {
    if (!newSectionName) {
      alert("Veuillez renseigner un nom de section");
      return;
    }
    if (selectedFields.length === 0) {
      alert("Veuillez sélectionner au moins un champ pour cette section");
      return;
    }

    setSections([...sections, { name: newSectionName, fields: selectedFields }]);
    setNewSectionName("");
    setSelectedFields([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || sections.length === 0) {
      alert("Veuillez remplir le nom et au moins une section");
      return;
    }

    try {
      await createTemplate({ name, sections });
      navigate("/templates");
    } catch (err) {
      console.error("Erreur création template :", err);
      alert("Erreur lors de la création du template");
    }
  };

  return (
    <>
      <Navbar />
      <div className="deals-manager-container">
        <header className="manager-header">
          <h1>Créer un nouveau Template</h1>
        </header>

        <form className="deal-form" onSubmit={handleSubmit}>
          <h2>Informations générales</h2>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Nom du template"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <h2>Nouvelle section</h2>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Nom de la section"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
            />
          </div>

          <div className="form-grid fields-checkboxes">
            <p>Sélectionnez les champs à inclure :</p>
            {availableFields.map((field) => (
              <label key={field} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedFields.includes(field)}
                  onChange={() => toggleField(field)}
                />
                {field}
              </label>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" className="save-btn" onClick={addSection}>
              Ajouter Section
            </button>
          </div>

          <h2>Sections ajoutées</h2>
          <div className="form-grid">
            {sections.length > 0 ? (
              sections.map((sec, idx) => (
                <div key={idx} className="no-section-text">
                  <strong  className="no-section-text" >{sec.name}</strong>: {sec.fields.join(", ")}
                </div>
              ))
            ) : (
              <p className="no-section-text">Aucune section ajoutée pour l'instant.</p>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate("/templates")}>
              Annuler
            </button>
            <button type="submit" className="save-btn">
              Créer Template
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateTemplate;
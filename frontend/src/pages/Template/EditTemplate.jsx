import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/NavBar";
import { fetchTemplateById, fetchTemplateFields, updateTemplate } from "../../services/Templates";

function EditTemplate() {
  const { templateId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [sections, setSections] = useState([]);
  const [newSectionName, setNewSectionName] = useState("");
  const [availableFields, setAvailableFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);

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

  useEffect(() => {
    const getTemplate = async () => {
      try {
        const template = await fetchTemplateById(templateId);
        setName(template.name);
        setSections(template.sections || []);
      } catch (err) {
        console.error("Erreur récupération template :", err);
      }
    };
    getTemplate();
  }, [templateId]);

  const toggleField = (field) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((f) => f !== field));
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

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || sections.length === 0) {
      alert("Veuillez remplir le nom et au moins une section");
      return;
    }

    try {
      await updateTemplate(templateId, { name, sections });
      navigate("/templates");
    } catch (err) {
      console.error("Erreur mise à jour template :", err);
      alert("Erreur lors de la mise à jour du template");
    }
  };

  return (
    <>
      <Navbar />

      <div className="deals-manager-container">
        <header className="manager-header">
          <h1>Modifier Template</h1>
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

          <div className="fields-checkboxes">
            <p>Cochez les champs à inclure :</p>

            {availableFields.map((field) => (
              <label key={field}>
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
            <button type="button" className="add-btn" onClick={addSection}>
              Ajouter Section
            </button>
          </div>


          <h2>Sections existantes</h2>

          <div className="form-grid">
            {sections.length > 0 ? (
              sections.map((sec, idx) => (
                <div key={idx} className="section-summary">
                  <strong>{sec.name}</strong>: {sec.fields.join(", ")}
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeSection(idx)}
                  >
                    Supprimer
                  </button>
                </div>
              ))
            ) : (
              <p className="no-section-text">
                Aucune section ajoutée pour l'instant.
              </p>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/templates")}
            >
              Annuler
            </button>

            <button type="submit" className="save-btn">
              Mettre à jour
            </button>
          </div>

        </form>
      </div>
    </>
  );
}

export default EditTemplate;
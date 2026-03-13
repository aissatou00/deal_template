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
      alert("Template mis à jour avec succès !");
      navigate("/templates"); 
    } catch (err) {
      console.error("Erreur mise à jour template :", err);
      alert("Erreur lors de la mise à jour du template");
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-template-container">
        <h1>Modifier le Template</h1>

        <label>
          Nom du template :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du template"
          />
        </label>

        <h3>Nouvelle section</h3>
        <input
          type="text"
          placeholder="Nom de la section"
          value={newSectionName}
          onChange={(e) => setNewSectionName(e.target.value)}
        />

        <div className="fields-checkboxes">
          <p>Cochez les champs à inclure dans cette section :</p>
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

        <button type="button" onClick={addSection}>
          Ajouter Section
        </button>

        <h3>Sections existantes</h3>
        {sections.length > 0 ? (
          sections.map((sec, idx) => (
            <div key={idx}>
              <strong>{sec.name}</strong>: {sec.fields.join(", ")}
              <button type="button" onClick={() => removeSection(idx)}>
                Supprimer
              </button>
            </div>
          ))
        ) : (
          <p>Aucune section ajoutée pour l'instant.</p>
        )}

        <button onClick={handleSubmit}>Mettre à jour le Template</button>
      </div>
    </>
  );
}

export default EditTemplate;
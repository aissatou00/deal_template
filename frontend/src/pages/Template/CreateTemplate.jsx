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
      alert("Template créé avec succès !");
      navigate("/templates"); 
    } catch (err) {
      console.error("Erreur création template :", err);
      alert("Erreur lors de la création du template");
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-template-container">
        <h1>Créer un nouveau Template</h1>

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

        <h3>Sections ajoutées</h3>
        {sections.length > 0 ? (
          sections.map((sec, idx) => (
            <div key={idx}>
              <strong>{sec.name}</strong>: {sec.fields.join(", ")}
            </div>
          ))
        ) : (
          <p>Aucune section ajoutée pour l'instant.</p>
        )}

        <button onClick={handleSubmit}>Créer Template</button>
      </div>
    </>
  );
}

export default CreateTemplate;
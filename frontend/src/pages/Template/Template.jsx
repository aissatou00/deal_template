import { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/NavBar";
import { fetchTemplates, deleteTemplate } from "../../services/Templates";
import { useNavigate } from "react-router-dom";

function Templates() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const data = await fetchTemplates();
      setTemplates(data);
    } catch (err) {
      console.error("Erreur chargement templates:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce template ?")) {
      try {
        await deleteTemplate(id);
        loadTemplates();
      } catch (err) {
        console.error("Erreur suppression:", err);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="templates-manager-container">
        <header className="manager-header">
          <h1>Gestion des Templates</h1>
          
        </header>
        
        <table className="templates-table">
          <thead>
            <tr>
              <th>Nom du Template</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates.length > 0 ? (
              templates.map((t) => (
                <tr key={t._id}>
                  <td>{t.name}</td>
                  <td>
                    <button className="edit-btn" onClick={() => navigate(`/templates/edit/${t._id}`)} >
                      Modifier
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(t._id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">Aucun template trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Templates;
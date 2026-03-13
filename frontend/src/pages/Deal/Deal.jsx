import { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/NavBar";
import { fetchDeals, deleteDeal } from "../../services/Deals";

function DealsPage() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      const data = await fetchDeals();
      setDeals(data);
    } catch (err) {
      console.error("Erreur chargement deals:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce deal ?")) {
      try {
        await deleteDeal(id);
        loadDeals();
      } catch (err) {
        console.error("Erreur suppression:", err);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="deals-manager-container">
        <header className="manager-header">
          <h1>Gestion des Métiers</h1>
          <button className="add-btn" onClick={() => alert("Formulaire de création à venir")}>
            + Nouveau Deal
          </button>
        </header>

        <table className="deals-table">
          <thead>
            <tr>
              <th>Référence</th>
              <th>Titre</th>
              <th>Client</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.length > 0 ? (
              deals.map((deal) => (
                <tr key={deal._id}>
                  <td>{deal.reference}</td>
                  <td>{deal.title}</td>
                  <td>{deal.clientName}</td>
                  <td>
                    <span className={`badge ${deal.status}`}>
                      {deal.status}
                    </span>
                  </td>
                  <td>
                    <button className="edit-btn">Modifier</button>
                    <button className="delete-btn" onClick={() => handleDelete(deal._id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>Aucun deal trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DealsPage;
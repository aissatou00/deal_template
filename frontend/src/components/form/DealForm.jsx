import { useState } from "react";
import Navbar from "../../components/NavBar/NavBar";
import { createDeal } from "../../services/Deals";
import { useNavigate } from "react-router-dom";

function DealForm() {
  const navigate = useNavigate();

  const [deal, setDeal] = useState({
    reference: "",
    title: "",
    subtitle: "",
    clientName: "",
    clientCode: "",
    industry: "",
    country: "",
    city: "",
    ownerName: "",
    ownerEmail: "",
    status: "",
    subStatus: "",
    priority: "",
    stage: "",
    estimatedRevenue: "",
    estimatedMargin: "",
    currency: "EUR",
    probability: "",
    expectedCloseDate: "",

    contacts: [{ firstName: "", lastName: "", jobTitle: "", email: "", isDecisionMaker: false }],
    products: [{ name: "", quantity: 1, unitPrice: "", discountPercent: "", finalPrice: "" }],

    financials: {
      subtotal: "",
      discountGlobalPercent: "",
      taxPercent: "",
      totalExclTax: "",
      totalInclTax: "",
      estimatedCost: "",
      expectedProfit: ""
    },

    commercial: {
      needIdentified: false,
      competitors: "",
      painPoints: "",
      proposedSolution: "",
      nextStep: "",
      nextStepDate: ""
    },

    delivery: {
      deliveryMode: "",
      region: "",
      implementationComplexity: "",
      estimatedKickoffDate: "",
      estimatedDeliveryWeeks: "",
      requiresTraining: false,
      requiresMigration: false
    },

    governance: {
      createdBy: "",
      approvedByManager: false,
      requiresLegalValidation: false,
      requiresFinanceValidation: false,
      isArchived: false
    },

    tags: "",
    notes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeal({ ...deal, [name]: value });
  };

  const handleNestedChange = (section, e) => {
    const { name, value } = e.target;
    setDeal({
      ...deal,
      [section]: { ...deal[section], [name]: value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDeal(deal);
      navigate("/deals");
    } catch (err) {
      console.error("Erreur création deal:", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="deals-manager-container">
        <header className="manager-header">
          <h1>Nouveau Deal</h1>
        </header>

        <form className="deal-form" onSubmit={handleSubmit}>

          {/* GENERAL INFO */}
          <h2>Informations générales</h2>
          <div className="form-grid">
            <input name="reference" placeholder="Référence" value={deal.reference} onChange={handleChange} />
            <input name="title" placeholder="Titre" value={deal.title} onChange={handleChange} />
            <input name="subtitle" placeholder="Sous titre" value={deal.subtitle} onChange={handleChange} />

            <input name="clientName" placeholder="Client" value={deal.clientName} onChange={handleChange} />
            <input name="clientCode" placeholder="Code client" value={deal.clientCode} onChange={handleChange} />
            <input name="industry" placeholder="Industrie" value={deal.industry} onChange={handleChange} />
            <input name="country" placeholder="Pays" value={deal.country} onChange={handleChange} />
            <input name="city" placeholder="Ville" value={deal.city} onChange={handleChange} />

            <input name="ownerName" placeholder="Owner" value={deal.ownerName} onChange={handleChange} />
            <input name="ownerEmail" placeholder="Email Owner" value={deal.ownerEmail} onChange={handleChange} />

            <input name="status" placeholder="Statut" value={deal.status} onChange={handleChange} />
            <input name="subStatus" placeholder="Sous statut" value={deal.subStatus} onChange={handleChange} />
            <input name="priority" placeholder="Priorité" value={deal.priority} onChange={handleChange} />
            <input name="stage" placeholder="Stage" value={deal.stage} onChange={handleChange} />

            <input type="number" name="estimatedRevenue" placeholder="CA estimé" value={deal.estimatedRevenue} onChange={handleChange} />
            <input type="number" name="estimatedMargin" placeholder="Marge estimée" value={deal.estimatedMargin} onChange={handleChange} />
            <input name="currency" placeholder="Devise" value={deal.currency} onChange={handleChange} />
            <input type="number" name="probability" placeholder="Probabilité %" value={deal.probability} onChange={handleChange} />
            <input type="date" name="expectedCloseDate" value={deal.expectedCloseDate} onChange={handleChange} />
          </div>

          {/* FINANCIALS */}
          <h2>Finances</h2>
          <div className="form-grid">
            <input name="subtotal" placeholder="Subtotal" value={deal.financials.subtotal} onChange={(e) => handleNestedChange("financials", e)} />
            <input name="discountGlobalPercent" placeholder="Remise %" value={deal.financials.discountGlobalPercent} onChange={(e) => handleNestedChange("financials", e)} />
            <input name="taxPercent" placeholder="Taxe %" value={deal.financials.taxPercent} onChange={(e) => handleNestedChange("financials", e)} />
            <input name="totalExclTax" placeholder="Total HT" value={deal.financials.totalExclTax} onChange={(e) => handleNestedChange("financials", e)} />
            <input name="totalInclTax" placeholder="Total TTC" value={deal.financials.totalInclTax} onChange={(e) => handleNestedChange("financials", e)} />
            <input name="estimatedCost" placeholder="Coût estimé" value={deal.financials.estimatedCost} onChange={(e) => handleNestedChange("financials", e)} />
            <input name="expectedProfit" placeholder="Profit attendu" value={deal.financials.expectedProfit} onChange={(e) => handleNestedChange("financials", e)} />
          </div>

          {/* COMMERCIAL */}
          <h2>Commercial</h2>
          <div className="form-grid">
            <input name="competitors" placeholder="Concurrents (séparés par ,)" value={deal.commercial.competitors} onChange={(e) => handleNestedChange("commercial", e)} />
            <input name="painPoints" placeholder="Pain points" value={deal.commercial.painPoints} onChange={(e) => handleNestedChange("commercial", e)} />
            <input name="proposedSolution" placeholder="Solution proposée" value={deal.commercial.proposedSolution} onChange={(e) => handleNestedChange("commercial", e)} />
            <input name="nextStep" placeholder="Next step" value={deal.commercial.nextStep} onChange={(e) => handleNestedChange("commercial", e)} />
            <input type="date" name="nextStepDate" value={deal.commercial.nextStepDate} onChange={(e) => handleNestedChange("commercial", e)} />
          </div>

          {/* DELIVERY */}
          <h2>Delivery</h2>
          <div className="form-grid">
            <input name="deliveryMode" placeholder="Mode livraison" value={deal.delivery.deliveryMode} onChange={(e) => handleNestedChange("delivery", e)} />
            <input name="region" placeholder="Région" value={deal.delivery.region} onChange={(e) => handleNestedChange("delivery", e)} />
            <input name="implementationComplexity" placeholder="Complexité" value={deal.delivery.implementationComplexity} onChange={(e) => handleNestedChange("delivery", e)} />
            <input type="date" name="estimatedKickoffDate" value={deal.delivery.estimatedKickoffDate} onChange={(e) => handleNestedChange("delivery", e)} />
            <input name="estimatedDeliveryWeeks" placeholder="Durée (semaines)" value={deal.delivery.estimatedDeliveryWeeks} onChange={(e) => handleNestedChange("delivery", e)} />
          </div>

          {/* GOVERNANCE */}
          <h2>Gouvernance</h2>
          <div className="form-grid">
            <input name="createdBy" placeholder="Créé par" value={deal.governance.createdBy} onChange={(e) => handleNestedChange("governance", e)} />
          </div>

          {/* TAGS */}
          <h2>Tags</h2>
          <input name="tags" placeholder="tags séparés par ," value={deal.tags} onChange={handleChange} />

          {/* NOTES */}
          <h2>Notes</h2>
          <textarea name="notes" placeholder="Ajouter une note..." value={deal.notes} onChange={handleChange} />

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate("/deals")}>Annuler</button>
            <button type="submit" className="save-btn">Enregistrer</button>
          </div>

        </form>
      </div>
    </>
  );
}

export default DealForm;
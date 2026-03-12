import { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/NavBar";
import { fetchDeals } from "../../services/Deals";
import { fetchTemplates } from "../../services/Templates";

function Home() {
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const deals = await fetchDeals();
        console.log("deals :", deals);

        const templates = await fetchTemplates();
        console.log("templates :", templates);

      } catch (err) {
        setError(err.message);
      }
    };

    getData();
  }, []); 

  return (
    <>
      <Navbar />

      <div className="home-container">
        <div className="templates-sidebar">
          <h2>Templates</h2>
          <button className="template-btn btn-blue">Vue Synthétique</button>
          <button className="template-btn btn-green">Vue Commerciale</button>
          <button className="template-btn btn-orange">Vue Financière</button>
          <button className="template-btn btn-purple">Vue Direction</button>
          
          <button className="create-btn">+ Create New Template</button>
        </div>
      </div>
    </>
  );
}

export default Home;
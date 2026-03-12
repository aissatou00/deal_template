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
        <h1>Welcome to Deal Manager</h1>
        <p>Manage your deals and templates easily.</p>
        {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
      </div>
    </>
  );
}

export default Home;
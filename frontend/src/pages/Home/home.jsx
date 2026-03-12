import { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/NavBar";
import { fetchDeals } from "../../services/Deals";

function Home() {
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDeals = async () => {
      try {
        console.log("avant fetch: ");
        const data = await fetchDeals();
        console.log("data : ", data);
      } catch (err) {
        setError(err.message);
      }
    };

    getDeals();
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
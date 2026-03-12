import Navbar from "../../components/NavBar/NavBar";

function Home() {
  return (
    <>
      <Navbar />

      <div className="home-container">
        <h1>Welcome to Deal Manager</h1>
        <p>Manage your deals and templates easily.</p>
      </div>
    </>
  );
}

export default Home;
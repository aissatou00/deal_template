import "../../layout/global.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">DealManager</div>

      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/deals">Deal</a></li>
        <li><a href="/templates">Template</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
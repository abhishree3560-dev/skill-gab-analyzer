import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand text-danger fw-bold" to="/">
          🔥 Skill Gap Analyzer
        </Link>
      </div>
    </nav>
  );
}
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-zinc-600">
      <nav>
        <ul className="nav flex justify-between">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </div>
  )
}

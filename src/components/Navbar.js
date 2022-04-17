import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import "./Navbar.css";
import Temple from "../assets/temple.svg";

export default function Navbar() {
  const { logout, isePending } = useLogout();
  const { user } = useAuthContext();
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="logo" />
          <span>The Dogo</span>
        </li>
        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        )}
        <li>
          {user && !isePending && (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          )}
          {user && isePending && (
            <button className="btn" disabled>
              Logingout...
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}

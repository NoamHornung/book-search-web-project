import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="nav">
      <a href="/" className="site-title">
        Book Search
      </a>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        {user ? null : <CustomLink to="/signup">Sign Up</CustomLink>}
        {user ? null : <CustomLink to="/login">Log In</CustomLink>}

        {user ? <CustomLink to="/myLists">My Lists</CustomLink> : null}
        {user ? <button onClick={handleClick}>Log Out</button> : null}
        {user ? <span>{user.email}</span> : null}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

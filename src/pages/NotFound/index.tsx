import { Link } from "react-router-dom";
import "./styles.css";

function NotFound() {
  return (
    <div className="notFoundContainer" data-testid="notFound">
      <h2>Sorry, there nothing to see here :/</h2>
      <Link to="/network">Go back </Link>
    </div>
  );
}

export default NotFound;

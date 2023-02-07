import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <ul className="flex">
      <li className="mr-6">
        <Link to="/" className="text-blue-500 hover:text-blue-800">
          Home
        </Link>
      </li>
      <li className="mr-6">
        <Link to="/add" className="text-blue-500 hover:text-blue-800">
          Add Poll
        </Link>
      </li>
      <li className="mr-6">
        <Link to="/leaderboard" className="text-blue-500 hover:text-blue-800">
          Leaderboard
        </Link>
      </li>
    </ul>
  );
};

export default Nav;

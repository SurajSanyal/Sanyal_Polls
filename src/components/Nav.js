import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { unsetAuthedUser } from "../actions/authedUser";

const Nav = ({ authedUser, dispatch }) => {
  return (
    <ul className="flex my-6">
      <li className="mr-6">
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-800"
          data-testid="home"
        >
          Home
        </Link>
      </li>
      <li className="mr-6">
        <Link
          to="/add"
          className="text-blue-500 hover:text-blue-800"
          data-testid="add-poll"
        >
          Add Poll
        </Link>
      </li>
      <li className="mr-6">
        <Link
          to="/leaderboard"
          className="text-blue-500 hover:text-blue-800"
          data-testid="leaderboard"
        >
          Leaderboard
        </Link>
      </li>
      <li
        className="ml-auto"
        onClick={() => {
          console.log("Log out");
          dispatch(unsetAuthedUser());
        }}
        data-testid="logout"
      >
        <span className="text-blue-500 hover:text-blue-800">
          Log Out ({authedUser})
        </span>
      </li>
    </ul>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(Nav);

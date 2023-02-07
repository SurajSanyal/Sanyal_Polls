import { connect } from "react-redux";
import { useState } from "react";
import { setAuthedUser } from "../actions/authedUser";

const Login = ({ dispatch, users }) => {
  const [isLoginValid, setIsLoginValid] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Read form data
    const form = e.target;
    const formData = new FormData(form);
    const { user, pass } = Object.fromEntries(formData.entries());

    // Validate Login info
    if (users[user] && users[user].password === pass) {
      setIsLoginValid(true);
      dispatch(setAuthedUser(user));
    } else {
      setIsLoginValid(false);
    }
  };

  return (
    <div>
      <div className="text-lg font-semibold py-2">Log In</div>
      <form onSubmit={handleSubmit}>
        <div className="py-2">
          <div>Username</div>
          <input
            className="p-2 rounded"
            name="user"
            type="text"
            placeholder="Username"
            data-testid="username"
          />
        </div>

        <div className="py-2">
          <div>Password</div>
          <input
            className="p-2 rounded"
            name="pass"
            type="password"
            data-testid="password"
            placeholder="Password"
          />
        </div>
        <button
          data-testid="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded"
        >
          Log In
        </button>
      </form>

      {isLoginValid === false && (
        <div className="rounded-sm bg-red-200" data-testid="error-msg">
          <span>Error: Invalid Login</span>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};

export default connect(mapStateToProps)(Login);

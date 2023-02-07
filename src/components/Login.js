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
      <div>Log In</div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>Username</div>
          <input name="user" type="text" placeholder="Username" />
        </div>

        <div>
          <div>Password</div>
          <input name="pass" type="password" placeholder="Password" />
        </div>
        <button>Log In</button>
      </form>

      {isLoginValid === false && (
        <div className="rounded-sm bg-red-200">
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

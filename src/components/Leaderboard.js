import { connect } from "react-redux";

const Leaderboard = ({ sortedUsers }) => {
  return (
    <table className="table-auto mx-auto">
      <thead>
        <tr>
          <th>User</th>
          <th>Questions Asked</th>
          <th>Questions Answered</th>
        </tr>
      </thead>

      <tbody>
        {sortedUsers.map((user) => {
          return (
            <tr key={user.id}>
              <td className="grid justify-center">
                <div className="flex items-center justify-self-auto">
                  <img src={user.avatarURL} alt="Profile" className="h-10" />
                  <span>{user.name}</span>
                </div>
              </td>
              <td>{user.questions.length}</td>
              <td>{Object.keys(user.answers).length}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// Access store to sort users from most to least score
const mapStateToProps = ({ users }) => {
  // sorting users by #q's + #a's.
  // returns array of usernames
  const sortedUsernames = Object.keys(users).sort((a, b) => {
    const scoreA =
      Object.keys(users[a].answers).length + users[a].questions.length;
    const scoreB =
      Object.keys(users[b].answers).length + users[b].questions.length;

    return scoreB - scoreA;
  });

  return {
    sortedUsers: sortedUsernames.map((username) => users[username]),
  };
};

export default connect(mapStateToProps)(Leaderboard);

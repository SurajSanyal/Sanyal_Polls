import { connect } from "react-redux";

const Leaderboard = ({ sortedUsers }) => {
  return (
    <div className="rounded mx-auto bg-slate-100 text-lg font-semibold py-2">
      <table className="table-auto mx-auto w-full text-sm text-left text-blue-500">
        <thead className="text-xs text-blue-500 uppercase bg-slate-100">
          <tr>
            <th className="px-6 py-3">User</th>
            <th className="px-6 py-3">Questions Asked</th>
            <th className="px-6 py-3">Questions Answered</th>
          </tr>
        </thead>

        <tbody>
          {sortedUsers.map((user) => {
            return (
              <tr key={user.id} className="bg-slate-100">
                <td className="px-6 py-4 font-medium text-blue-500 whitespace-nowrap">
                  <div className="flex items-center justify-self-auto">
                    <img
                      src={user.avatarURL}
                      alt="Profile"
                      className="h-10 pr-3"
                    />
                    <span>{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{user.questions.length}</td>
                <td className="px-6 py-4">
                  {Object.keys(user.answers).length}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
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

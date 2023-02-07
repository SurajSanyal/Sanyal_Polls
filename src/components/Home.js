import { connect } from "react-redux";
import { useState } from "react";
import PollPreview from "./PollPreview";

const Home = ({ name, answeredPolls, unansweredPolls }) => {
  const [showUnanswered, setShowUnanswered] = useState(true);

  const pollsToDisplay = showUnanswered ? unansweredPolls : answeredPolls;

  const handleChange = (e) => {
    setShowUnanswered(e.target.value === "unanswered");
  };

  return (
    <div>
      <div>Welcome {name.replace(/ .*/, "")}!</div>
      <div>
        Polls to display:{" "}
        <span>
          <select defaultValue="unanswered" onChange={handleChange}>
            <option value="unanswered">Unanswered</option>
            <option value="answered">Answered</option>
          </select>
        </span>
      </div>
      <div className="flex gap-3">
        {pollsToDisplay.map((pollId) => {
          return <PollPreview key={pollId} id={pollId} />;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, polls }) => {
  // Arr w/ keys = ids of answered polls
  const answeredPolls = Object.keys(users[authedUser].answers);

  const unansweredPolls = Object.keys(polls).filter(
    (pollId) => !answeredPolls.includes(pollId)
  );

  // @todo sort both poll lists by recent-first
  return { name: users[authedUser].name, answeredPolls, unansweredPolls };
};

export default connect(mapStateToProps)(Home);

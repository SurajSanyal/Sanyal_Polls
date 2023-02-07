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
      <div className="text-2xl text-gray-800 font-semibold mb-4">
        Welcome {name.replace(/ .*/, "")}!
      </div>
      <div className="pb-2">
        Polls to display:{" "}
        <span>
          <select
            defaultValue="unanswered"
            onChange={handleChange}
            className="rounded"
          >
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
  const pollSorter = (pollOneId, pollTwoId) => {
    return polls[pollTwoId].timestamp - polls[pollOneId].timestamp;
  };

  // Arr w/ keys = ids of answered polls
  const answeredPolls = Object.keys(users[authedUser].answers).sort(pollSorter);

  const unansweredPolls = Object.keys(polls)
    .filter((pollId) => !answeredPolls.includes(pollId))
    .sort(pollSorter);

  return { name: users[authedUser].name, answeredPolls, unansweredPolls };
};

export default connect(mapStateToProps)(Home);

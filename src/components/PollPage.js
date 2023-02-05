import { connect } from "react-redux";
import { useState } from "react";

const PollPage = ({ poll, answer, previouslyAnswered, id }) => {
  const [formAnswer, setFormAnswer] = useState(answer);

  const handleFormChange = (e) => {
    setFormAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // @todo update store and whatnot
    console.log("Submitting answer: ", formAnswer);
  };

  // console.log({ poll, answer, previouslyAnswered, id });

  if (poll === null) {
    return <p>404: This poll doesn't exist. :(</p>;
  }

  return (
    <div className="rounded mx-auto bg-slate-100">
      <div className="text-lg font-semibold">
        {poll.author} asks: Would You Rather...
      </div>
      {!previouslyAnswered ? (
        <form onSubmit={handleSubmit}>
          <input
            name="option"
            type="radio"
            onChange={handleFormChange}
            checked={formAnswer === poll.optionOne.text}
            value={poll.optionOne.text}
          />{" "}
          {poll.optionOne.text}
          <br />
          <input
            name="option"
            type="radio"
            onChange={handleFormChange}
            checked={formAnswer === poll.optionTwo.text}
            value={poll.optionTwo.text}
          />{" "}
          {poll.optionTwo.text}
          <br />
          <button
            disabled={formAnswer === ""}
            className="bg-white hover:bg-blue-50"
          >
            Submit
          </button>
        </form>
      ) : (
        <>
          <div>You voted: {answer}</div>
          <div>
            {poll.optionOne.text} - {poll.optionOne.votes.length} vote(s) (
            {Math.round(
              (poll.optionOne.votes.length /
                (poll.optionOne.votes.length + poll.optionTwo.votes.length)) *
                100
            )}
            %)
          </div>
          <div>
            {poll.optionTwo.text} - {poll.optionTwo.votes.length} vote(s) (
            {Math.round(
              (poll.optionTwo.votes.length /
                (poll.optionOne.votes.length + poll.optionTwo.votes.length)) *
                100
            )}
            %)
          </div>
        </>
      )}
    </div>
  );
};

// connecting to store to grab poll info from state
// & see if authedUser answered poll already
const mapStateToProps = ({ authedUser, polls }, { id }) => {
  const poll = polls[id] ? polls[id] : null;
  let answer = "";

  // 404: Poll Not Found
  if (poll === null) {
    return {
      poll,
      answer,
      previouslyAnswered: false,
    };
  }

  if (poll.optionOne.votes.includes(authedUser)) {
    answer = poll.optionOne.text;
  } else if (poll.optionTwo.votes.includes(authedUser)) {
    answer = poll.optionTwo.text;
  }

  return {
    poll,
    answer,
    previouslyAnswered: answer !== "",
  };
};

export default connect(mapStateToProps)(PollPage);

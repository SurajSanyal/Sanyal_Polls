import { connect } from "react-redux";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAnswerPoll } from "../actions/polls";
import { addAnswerToUser } from "../actions/users";

// Helper function from react-router
const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const PollPage = ({
  poll,
  answer,
  previouslyAnswered,
  authedUser,
  authorIcon,
  dispatch,
}) => {
  const [formAnswer, setFormAnswer] = useState(answer);

  const handleFormChange = (e) => {
    setFormAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionAnswer = {
      authedUser,
      qid: poll.id,
      answer: formAnswer === poll.optionOne.text ? "optionOne" : "optionTwo",
    };

    dispatch(handleAnswerPoll(questionAnswer));
    dispatch(addAnswerToUser(questionAnswer));
  };

  if (poll === null) {
    return (
      <p className="rounded mx-auto bg-slate-100 text-lg font-semibold py-2">
        404: This poll doesn't exist. :(
      </p>
    );
  }

  return (
    <div className="rounded mx-auto bg-slate-100">
      <div className="text-lg font-semibold py-2">
        <span>
          <img src={authorIcon} alt="Profile" className="mx-auto" />
        </span>
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
            className="mb-2"
          />{" "}
          {poll.optionOne.text}
          <br />
          <input
            name="option"
            type="radio"
            onChange={handleFormChange}
            checked={formAnswer === poll.optionTwo.text}
            value={poll.optionTwo.text}
            className="mb-2"
          />{" "}
          {poll.optionTwo.text}
          <br />
          <button
            disabled={formAnswer === ""}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-300 disabled:opacity-70 my-3"
          >
            Submit
          </button>
        </form>
      ) : (
        <>
          <div className="pb-4 italic">You voted: {answer}</div>
          <div className="pb-2 font-semibold">Results</div>
          <div
            className={`py-1 w-[50] mx-auto ${
              answer === poll.optionOne.text ? "italic" : ""
            }`}
          >
            {poll.optionOne.text} - {poll.optionOne.votes.length} vote(s) (
            {Math.round(
              (poll.optionOne.votes.length /
                (poll.optionOne.votes.length + poll.optionTwo.votes.length)) *
                100
            )}
            %)
          </div>
          <div
            className={`py-1 w-[50%] mx-auto ${
              answer === poll.optionTwo.text ? "italic bg-green-200" : ""
            }`}
          >
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
const mapStateToProps = ({ authedUser, polls, users }, props) => {
  const { id } = props.router.params;
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
    authedUser,
    authorIcon: users[poll.author].avatarURL,
  };
};

export default withRouter(connect(mapStateToProps)(PollPage));

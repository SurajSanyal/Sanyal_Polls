import { connect } from "react-redux";
import { Link } from "react-router-dom";

const PollPreview = ({ id, author, timestamp }) => {
  return (
    <div className="rounded bg-slate-100 w-56 h-32">
      <div>{author}</div>
      <div>
        <span>{new Date(timestamp).toLocaleDateString("en-US")}</span>
        {" | "}
        {new Date(timestamp).toLocaleTimeString("en-US")}
        <span></span>
      </div>
      <Link to={`/poll/${id}`}>Show</Link>
    </div>
  );
};

// connecting to store to grab poll info from "questions" obj
const mapStateToProps = ({ polls }, { id }) => {
  const poll = polls[id];
  console.log(poll);

  return {
    author: poll.author,
    timestamp: poll.timestamp,
  };
};

export default connect(mapStateToProps)(PollPreview);

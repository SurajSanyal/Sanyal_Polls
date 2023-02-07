import { connect } from "react-redux";
import { Link } from "react-router-dom";

const PollPreview = ({ id, author, timestamp }) => {
  return (
    <div className="rounded bg-slate-100 w-56 h-32 pt-2">
      <div>{author}</div>
      <div className="text-gray-500">
        <span>{new Date(timestamp).toLocaleDateString("en-US")}</span>
        {" | "}
        {new Date(timestamp).toLocaleTimeString("en-US")}
        <span></span>
      </div>
      <div className="mt-4">
        <Link
          to={`/questions/${id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Show
        </Link>
      </div>
    </div>
  );
};

// connecting to store to grab poll info from "questions" obj
const mapStateToProps = ({ polls }, { id }) => {
  const poll = polls[id];

  return {
    author: poll.author,
    timestamp: poll.timestamp,
  };
};

export default connect(mapStateToProps)(PollPreview);

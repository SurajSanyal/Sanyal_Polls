import { connect } from "react-redux";
import { handleAddPoll } from "../actions/polls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPoll = ({ authedUser, dispatch }) => {
  const navigate = useNavigate();

  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      handleAddPoll({
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: authedUser,
      })
    );

    navigate("/");
  };

  return (
    <div className="rounded mx-auto bg-slate-100 text-lg py-2">
      <div className="my-4 text-2xl text-gray-800 font-semibold mb-2">
        Would You Rather...
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <div className="my-2">
            <div>Option One</div>
            <input
              value={optionOne}
              onChange={(e) => setOptionOne(e.target.value)}
              type="text"
              placeholder="Option One"
              className="p-2 rounded"
            />
          </div>

          <div className="my-2">
            <div>Option Two</div>
            <input
              value={optionTwo}
              onChange={(e) => setOptionTwo(e.target.value)}
              type="text"
              placeholder="Option Two"
              className="p-2 rounded"
            />
          </div>
        </div>

        <button
          disabled={optionOne === "" || optionTwo === ""}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-40"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return { authedUser };
};

export default connect(mapStateToProps)(AddPoll);

import { connect } from "react-redux";
import { useEffect } from "react";
import PollPreview from "./PollPreview";
import { handleInitialData } from "../actions/shared";

function App({ loading, dispatch }) {
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <div className="App">
      {loading ? (
        <h3 className="center">Loading...</h3>
      ) : (
        <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10 text-center">
          <p className="text-3xl text-gray-700 font-bold mb-5">Welcome!</p>
          <p className="text-gray-500 text-lg">Let's show a poll.</p>
          <PollPreview id={"8xf0y6ziyjabvozdd253nd"} />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  // Not displaying dashboard until initialdata (including autheduser) is loaded
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);

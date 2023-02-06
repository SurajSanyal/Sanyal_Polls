import { connect } from "react-redux";
import { useEffect } from "react";
import ConnectedPollPreview from "./PollPreview";
import ConnectedPollPage from "./PollPage";
import Leaderboard from "./Leaderboard";
import { handleInitialData } from "../actions/shared";
import ConnectedHome from "./Home";

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
          <p className="text-3xl text-gray-700 font-bold mb-5">Polls App</p>
          {/* <ConnectedPollPreview id="8xf0y6ziyjabvozdd253nd" /> */}
          {/* <ConnectedPollPage id="8xf0y6ziyjabvozdd253nd" /> */}
          {/* <ConnectedPollPage id="vthrdm985a262al8qx3do" /> */}
          <ConnectedHome />
          {/* @todo create "Add" & "404" component */}
          {/* @todo Add Routing */}
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

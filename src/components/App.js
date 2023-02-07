import { connect } from "react-redux";
import { useEffect } from "react";
import PollPage from "./PollPage";
import Leaderboard from "./Leaderboard";
import { handleInitialData } from "../actions/shared";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import AddPoll from "./AddPoll";
import Login from "./Login";

function App({ isLoggedIn, dispatch }) {
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10 text-center">
      {!isLoggedIn ? (
        <Login />
      ) : (
        <>
          <Nav />
          <p className="text-3xl text-gray-700 font-bold mb-5">Polls App</p>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/poll/:id" element={<PollPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/add" element={<AddPoll />} />
          </Routes>
        </>
      )}
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  // Not displaying dashboard until initialdata (including autheduser) is loaded
  isLoggedIn: authedUser !== null,
});

export default connect(mapStateToProps)(App);

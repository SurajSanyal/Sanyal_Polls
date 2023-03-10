import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";
import { addPollToUser } from "./users";

export const RECEIVE_POLLS = "RECEIVE_POLLS";
export const ADD_POLL = "ADD_POLL";
export const ANSWER_POLL = "ANSWER_POLL";

export function receivePolls(polls) {
  return {
    type: RECEIVE_POLLS,
    polls,
  };
}

export function addPoll(poll) {
  return {
    type: ADD_POLL,
    poll,
  };
}

export function answerPoll({ authedUser, qid, answer }) {
  return {
    type: ANSWER_POLL,
    authedUser,
    qid,
    answer,
  };
}

// Async Function to implement poll answer
// answer obj will have data abt poll as per _DATA {authedUser, qid, answer}
export function handleAnswerPoll(answer) {
  return (dispatch) => {
    _saveQuestionAnswer(answer)
      .then((res) => {
        dispatch(answerPoll(answer));
      })
      .catch((e) => {
        console.warn("Error in handleAnswerPoll: ", e);
        alert("Error saving answer. Please try again.");
      });
  };
}

export function handleAddPoll(poll) {
  return (dispatch) => {
    _saveQuestion(poll)
      .then((res) => {
        dispatch(
          addPoll({
            [res.id]: res,
          })
        );

        dispatch(
          addPollToUser({
            id: res.id,
            user: res.author,
          })
        );
      })
      .catch((e) => {
        console.warn("Error in handleAddPoll: ", e);
        alert("Error saving poll. Please try again.");
      });
  };
}

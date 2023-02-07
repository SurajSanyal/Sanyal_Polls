import { _saveQuestionAnswer } from "../utils/_DATA";

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
        console.log(res);
        dispatch(answerPoll(answer));
      })
      .catch((e) => {
        console.warn("Error in handleAnswerPoll: ", e);
        alert("Error saving answer. Please try again.");
      });
  };
}
